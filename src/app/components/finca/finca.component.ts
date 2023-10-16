import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FincaService } from './../../services/finca/finca.service';
import { ToastrService } from 'ngx-toastr';
import { VerifyToken } from './../../services/verify-token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-finca',
  templateUrl: './finca.component.html',
  styleUrls: ['./finca.component.css']
})
export class FincaComponent implements OnInit {
  form: FormGroup;
  Farms: any;
  TituloAccion = 'Agregar';
  base64Image: string = '';
  rol!: string;
  imagenUrl!: string;
  fin_codigo!: string;
  selectedFarm: any;
  constructor(
    private fb: FormBuilder,
    private FarmService: FincaService,
    private toastr: ToastrService,
    private verifyToken: VerifyToken,
  ) {
    //restriccion del formulario
    this.form = this.fb.group({
      fin_nombre: ['', Validators.required],
      fin_tamanno: ['', Validators.required],
      fin_direccion: ['', Validators.required],
      fin_foto: ['', Validators.required],
      fin_productos: ['', Validators.required],
      fin_telefono: ['', Validators.required],
      fin_descripcion: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getFarms();
    //verificar rol
    this.rol = this.verifyToken.obtenerRol();
  }
  //Listar fincas
  getFarms() {
    this.FarmService.getFarm().subscribe(respuesta => {
      this.Farms = respuesta;
      console.log(respuesta);
    });
  }
  //Seleccionar una finca
  selectOneFarm(farm: any) {
    this.selectedFarm = farm;
  }
  //Agregar/Editar fincas
  addFarms() {
    const Farms: any = {
      fin_codigo: this.fin_codigo,
      fin_nombre: this.form.get('fin_nombre')?.value,
      fin_tamanno: this.form.get('fin_tamanno')?.value,
      fin_direccion: this.form.get('fin_direccion')?.value,
      fin_foto: this.base64Image,
      fin_productos: this.form.get('fin_productos')?.value,
      fin_telefono: this.form.get('fin_telefono')?.value,
      fin_descripcion: this.form.get('fin_descripcion')?.value,
    }
    //Agregar finca
    if (this.fin_codigo === undefined) {
      this.FarmService.addFarm(Farms).subscribe(respuesta => {
        this.ngOnInit();
        this.form.reset();
        this.toastr.success('Se agrego la noticia correctamente', 'Mensaje', {
          positionClass: 'toast-top-center',
          closeButton: true,
          timeOut: 5000,
          progressBar: true
        });
      });
    } else {
      //Editar finca
      this.FarmService.editFarm(this.fin_codigo, Farms).subscribe(respuesta => {
        this.TituloAccion = 'agregar';
        this.form.reset();
        this.ngOnInit();
        this.toastr.success('Se edito el administrador correctamente', 'Mensaje', {
          positionClass: 'toast-top-center',
          closeButton: true,
          timeOut: 5000,
          progressBar: true
        });
      });
    }
  }
  //Seleccionar finca
  selectFarm(Farms: any) {
    this.TituloAccion = 'Editar';
    this.fin_codigo = Farms.fin_codigo;
    this.form.patchValue({
      fin_codigo: this.fin_codigo,
      fin_nombre: Farms.fin_nombre,
      fin_tamanno: Farms.fin_tamanno,
      fin_direccion: Farms.fin_direccion,
      fin_productos: Farms.fin_productos,
      fin_telefono: Farms.fin_telefono,
      fin_descripcion: Farms.fin_descripcion,
    });
    this.imagenUrl = Farms.fin_foto;
  }
  //Seleccionar finca
  deleteFarm(fin_codigo: any, iControl: any) {
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
        this.FarmService.deleteFarm(fin_codigo).subscribe((respuesta) => {
          this.Farms.splice(iControl, 1);
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
    const file = event.target.files[0];
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

}
