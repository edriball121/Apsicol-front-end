import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { GranjeroService } from './../../services/granjero/granjero.service';
import { ToastrService } from 'ngx-toastr';
import { VerifyToken } from './../../services/verify-token.service';

@Component({
  selector: 'app-granjero',
  templateUrl: './granjero.component.html',
  styleUrls: [ './granjero.component.css' ]
})
export class GranjeroComponent implements OnInit {
  form: FormGroup;
  Farmers: any;
  TituloAccion = 'Agregar';
  gra_cedula: string | undefined;
  rol!: string;
  constructor(
    private fb: FormBuilder,
    private FarmerService: GranjeroService,
    private toastr: ToastrService,
    private verifyToken: VerifyToken,
  ) {
    //restricciones del formulario
    this.form = this.fb.group({
      gra_cedula: [ '', [ Validators.required, Validators.minLength(8), Validators.maxLength(11) ] ],
      gra_nombre: [ '', Validators.required ],
      gra_apellido: [ '', Validators.required ],
      gra_password: [ '', Validators.required ],
      gra_telefono: [ '', [ Validators.required, Validators.minLength(8), Validators.maxLength(11) ] ],
      gra_email: [ '', [ Validators.required, Validators.email ] ],
      gra_direccion: [ '', Validators.required ],
      gra_fecha_nacimiento: [ '', Validators.required ],
      gra_fecha_creacion: [ ''],
      gra_perfil_laboral: [ '', Validators.required ],
      rol: [ ''],
    })
  }

  ngOnInit(): void {
    //listar granjeros
    this.FarmerService.getFarmer().subscribe(respuesta => {
      this.Farmers = respuesta;
    });
    //verificar rol
    this.rol = this.verifyToken.obtenerRol();
  }

  //Agregar granjero
  public addFarmer() {
    //formatear la fecha
    const fechaActualUtc: Date = new Date();
    const fechaFormateada: string = fechaActualUtc.toISOString().split('T')[ 0 ];
    const getRol = 'farmer';
    //Capturar los valores del formulario
    const Farmers: any = {
      gra_cedula: this.form.get('gra_cedula')?.value.toString(),
      gra_nombre: this.form.get('gra_nombre')?.value,
      gra_apellido: this.form.get('gra_apellido')?.value,
      gra_password: this.form.get('gra_password')?.value,
      gra_telefono: this.form.get('gra_telefono')?.value.toString(),
      gra_email: this.form.get('gra_email')?.value,
      gra_direccion: this.form.get('gra_direccion')?.value,
      gra_fecha_nacimiento: this.form.get('gra_fecha_nacimiento')?.value,
      gra_perfil_laboral: this.form.get('gra_perfil_laboral')?.value,
      gra_fecha_creacion: fechaFormateada,
      rol: getRol
    }
    if (this.gra_cedula == undefined) {
      Farmers.gra_cedula == undefined;
      //Agregar granjero
      this.FarmerService.addFarmer(Farmers).subscribe(respuesta => {
        this.ngOnInit();
        this.form.reset();
        this.toastr.success('Se agrego el Granjero correctamente', 'Mensaje', {
          positionClass: 'toast-top-center',
          closeButton: true,
          timeOut: 5000,
          progressBar: true
        });
      });
    } else {
      this.FarmerService.editFarmer(this.gra_cedula, Farmers).subscribe(respuesta => {
        this.TituloAccion = 'agregar';
        this.form.reset();
        this.ngOnInit();
        this.gra_cedula = undefined;
        this.toastr.success('Se edito el administrador correctamente', 'Mensaje', {
          positionClass: 'toast-top-center',
          closeButton: true,
          timeOut: 5000,
          progressBar: true
        });
      });
    }
  }
  //Obtener los datos del granjero a editar
  selectFarmer(farmer: any) {
    this.TituloAccion = 'Editar';
    this.gra_cedula = farmer.gra_cedula;
    this.form.patchValue({
      gra_cedula: farmer.gra_cedula,
      gra_nombre: farmer.gra_nombre,
      gra_apellido: farmer.gra_apellido,
      gra_telefono: farmer.gra_telefono,
      gra_email: farmer.gra_email,
      gra_direccion: farmer.gra_direccion,
      gra_fecha_nacimiento: farmer.gra_fecha_nacimiento,
      gra_perfil_laboral: farmer.gra_perfil_laboral,
      rol: farmer.rol,
    });
    this.toastr.info('Se cargaron los datos correctamente', 'Mensaje', {
      positionClass: 'toast-top-center',
      closeButton: true,
      timeOut: 5000,
      progressBar: true
    });
  }
  //Eliminar granjero
  deleteFarmer(gra_cedula: any, iControl: any) {
    if (window.confirm('¿Esta seguro que desea borrar el registro?')) {
      this.FarmerService.deleteFarmer(gra_cedula).subscribe((respuesta) => {
        this.Farmers.splice(iControl, 1);
        this.toastr.error('Se elimino el registro correctamente', 'Mensaje', {
          positionClass: 'toast-top-center',
          closeButton: true,
          timeOut: 5000,
          progressBar: true
        });
      })
    }
  }
}
