import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AgricolaService } from './../../services/agricola/agricola.service';
import { ToastrService } from 'ngx-toastr';
import { VerifyToken } from './../../services/verify-token.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-agricola',
  templateUrl: './agricola.component.html',
  styleUrls: [ './agricola.component.css' ]
})
export class AgricolaComponent implements OnInit {
  form: FormGroup;
  Farmings: any;
  TituloAccion = 'Agregar';
  Ape_codigo!: string;
  rol!: string;
  base64Image: string = '';
  imagenUrl!: string;
  searchTerm: string = '';
  searchResults: any[] = [];
  constructor(
    private fb: FormBuilder,
    private FarmingService: AgricolaService,
    private toastr: ToastrService,
    private verifyToken: VerifyToken,
    private router: Router,
  ) {
    //restricciones del formulario
    this.form = this.fb.group({
      Ape_nombre: [ "" ],
      Ape_tipo: [ "" ],
      Ape_Foto: [ "" ],
      Ape_Descripcion: [ "" ],
    });
    this.searchTerm = '';
    this.searchResults = [];
  }

  ngOnInit(): void {
    this.getFarmig();
    this.search();
    //verificar rol
    this.rol = this.verifyToken.obtenerRol();
  }

  getFarmig() {
    console.log('getFarmig() called');
    //Listar productos agricolas
    this.FarmingService.getFarmig().subscribe(respuesta => {
      this.Farmings = respuesta;
    });
  }
  addFarming() {
    //formatear la fecha
    const fechaActualUtc: Date = new Date();
    const fechaFormateada: string = fechaActualUtc.toISOString().split('T')[ 0 ];

    const Farmings: any = {
      Ape_codigo: this.Ape_codigo,
      Ape_nombre: this.form.get('Ape_nombre')?.value,
      Ape_tipo: this.form.get('Ape_tipo')?.value,
      Ape_fecha_creacion: fechaFormateada,
      Ape_Foto: this.base64Image,
      Ape_Descripcion: this.form.get('Ape_Descripcion')?.value,
    }
    if (this.Ape_codigo == undefined) {
      //agregar noticia
      this.FarmingService.addFarmig(Farmings).subscribe(respuesta => {
        this.ngOnInit();
        this.form.reset();
        this.toastr.success('Se agrego el producto agricola correctamente', 'Mensaje', {
          positionClass: 'toast-top-center',
          closeButton: true,
          timeOut: 5000,
          progressBar: true
        });
      });
    } else {
      //editar noticia
      this.FarmingService.editFarmig(this.Ape_codigo, Farmings).subscribe(respuesta => {
        this.TituloAccion = 'agregar';
        this.form.reset();
        this.ngOnInit();
        this.toastr.success('Se edito el producto agricola correctamente', 'Mensaje', {
          positionClass: 'toast-top-center',
          closeButton: true,
          timeOut: 5000,
          progressBar: true
        });
      });
    }
  }
  selectFarming(Farmings: any) {
    this.TituloAccion = 'Editar';
    this.Ape_codigo = Farmings.Ape_codigo;
    this.form.patchValue({
      Ape_codigo: this.Ape_codigo,
      Ape_nombre: Farmings.Ape_nombre,
      Ape_tipo: Farmings.Ape_tipo,
      Ape_Descripcion: Farmings.Ape_Descripcion,
    });
    this.imagenUrl = Farmings.Ape_Foto;
  }
  //ver el producto agricola a detalle
  detailFarming(Farmings: any) {
    this.Ape_codigo = Farmings.Ape_codigo;
    this.form.patchValue({
      Ape_codigo: this.Ape_codigo,
      Ape_nombre: Farmings.Ape_nombre,
      Ape_tipo: Farmings.Ape_tipo,
      Ape_Descripcion: Farmings.Ape_Descripcion,
    });
    this.imagenUrl = Farmings.Ape_Foto;
    this.router.navigate([ 'farming', this.Ape_codigo ], { state: { detalles: Farmings } });
  }

  deleteFarming(Ape_codigo: any, iControl: any) {
    Swal.fire({
      title: '¿Estas seguro que deseas eliminar el registro?',
      text: "Si eliminas el registro no podras recuperarlo",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Lo quiero eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.FarmingService.deleteFarmig(Ape_codigo).subscribe((respuesta) => {
          this.Farmings.splice(iControl, 1);
          this.toastr.error('Se elimino el registro correctamente', 'Mensaje', {
            positionClass: 'toast-top-center',
            closeButton: true,
            timeOut: 5000,
            progressBar: true
          });
        })
        Swal.fire(
          'Eliminado!',
          'Tu registro ha sido borrado exitosamente!',
          'success'
        )
      }
    });//fin Swal
  }

  //convertir imagen a base64
  convertBase(event: any): void {
    const file = event.target.files[ 0 ];
    if (file) {
      this.convertToBase64(file);
    }
  }
  convertToBase64(file: File): void {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.base64Image = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  search() {
    console.log('search() called');
    if (this.Farmings) {
      this.searchResults = this.Farmings.filter((farming: any) => {
        return farming.Ape_nombre.toLowerCase().includes(this.searchTerm.toLowerCase());
      });
    }
  }

}
