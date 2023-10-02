import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { PecuarioService } from './../../services/pecuario/pecuario.service';
import { ToastrService } from 'ngx-toastr';
import { VerifyToken } from './../../services/verify-token.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pecuario',
  templateUrl: './pecuario.component.html',
  styleUrls: [ './pecuario.component.css' ]
})
export class PecuarioComponent implements OnInit {
  form: FormGroup;
  Livestock: any;
  TituloAccion = 'Agregar';
  Ape_codigo!: string;
  rol!: string;
  base64Image: string = '';
  imagenUrl!: string;
  searchTerm: string = '';
  searchResults: any[] = [];
  constructor(
    private fb: FormBuilder,
    private LivestockService: PecuarioService,
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
    this.getLivestock();
    this.search();
    //verificar rol
    this.rol = this.verifyToken.obtenerRol();
  }
  getLivestock() {
    //Listar productos pecuarios
    this.LivestockService.getLivestock().subscribe(respuesta => {
      this.Livestock = respuesta;
    });
  }

  addLivestock() {
    //formatear la fecha
    const fechaActualUtc: Date = new Date();
    const fechaFormateada: string = fechaActualUtc.toISOString().split('T')[ 0 ];

    const Livestocks: any = {
      Ape_codigo: this.Ape_codigo,
      Ape_nombre: this.form.get('Ape_nombre')?.value,
      Ape_tipo: this.form.get('Ape_tipo')?.value,
      Ape_fecha_creacion: fechaFormateada,
      Ape_Foto: this.base64Image,
      Ape_Descripcion: this.form.get('Ape_Descripcion')?.value,
    }
    if (this.Ape_codigo == undefined) {
      //agregar pecuario
      this.LivestockService.addLivestock(Livestocks).subscribe(respuesta => {
        this.ngOnInit();
        this.form.reset();
        this.toastr.success('Se agrego el producto pecuario correctamente', 'Mensaje', {
          positionClass: 'toast-top-center',
          closeButton: true,
          timeOut: 5000,
          progressBar: true
        });
      });
    } else {
      //editar pecuario
      this.LivestockService.editLivestock(this.Ape_codigo, Livestocks).subscribe(respuesta => {
        this.TituloAccion = 'agregar';
        this.form.reset();
        this.ngOnInit();
        this.toastr.success('Se edito el producto pecuario correctamente', 'Mensaje', {
          positionClass: 'toast-top-center',
          closeButton: true,
          timeOut: 5000,
          progressBar: true
        });
      });
    }
  }

  selectLivestock(Livestocks: any) {
    this.TituloAccion = 'Editar';
    this.Ape_codigo = Livestocks.Ape_codigo;
    this.form.patchValue({
      Ape_codigo: this.Ape_codigo,
      Ape_nombre: Livestocks.Ape_nombre,
      Ape_tipo: Livestocks.Ape_tipo,
      Ape_Descripcion: Livestocks.Ape_Descripcion,
    });
    this.imagenUrl = Livestocks.Ape_Foto;
  }

  //ver el producto pecuario a detalle
  detailLivestock(Livestocks: any) {
    this.Ape_codigo = Livestocks.Ape_codigo;
    this.form.patchValue({
      Ape_codigo: this.Ape_codigo,
      Ape_nombre: Livestocks.Ape_nombre,
      Ape_tipo: Livestocks.Ape_tipo,
      Ape_Descripcion: Livestocks.Ape_Descripcion,
    });
    this.imagenUrl = Livestocks.Ape_Foto;
    this.router.navigate([ 'livestock', this.Ape_codigo ], { state: { detalles: Livestocks } });
  }

  deleteLivestock(Ape_codigo: any, iControl: any) {
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
        this.LivestockService.deleteLivestock(Ape_codigo).subscribe((respuesta) => {
          this.Livestock.splice(iControl, 1);
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
    if (this.Livestock) {
      this.searchResults = this.Livestock.filter((Livestock: any) => {
        return Livestock.Ape_nombre.toLowerCase().includes(this.searchTerm.toLowerCase());
      });
    }
  }
}
