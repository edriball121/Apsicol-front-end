import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AdministradorService } from './../../services/administrador/administrador.service';
import { ToastrService } from 'ngx-toastr';
import { VerifyToken } from './../../services/verify-token.service'
@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: [ './administrador.component.css' ],
})

export class AdministradorComponent implements OnInit {
  form: FormGroup;
  Admins: any;
  TituloAccion = 'Agregar';
  adm_cedula: string | undefined;
  rol!: string;
  constructor(
    private fb: FormBuilder,
    private AdminService: AdministradorService,
    private toastr: ToastrService,
    private verifyToken: VerifyToken,
  ) {
    //restricciones del formulario
    this.form = this.fb.group({
      adm_cedula: [ '', [ Validators.required, Validators.minLength(8), Validators.maxLength(11) ] ],
      adm_nombre: [ '', Validators.required ],
      adm_apellido: [ '', Validators.required ],
      adm_password: [ '', Validators.required ],
      adm_telefono: [ '', [ Validators.required, Validators.minLength(8), Validators.maxLength(11) ] ],
      adm_email: [ '', [ Validators.required, Validators.email ] ],
      adm_direccion: [ '', Validators.required ],
      adm_fecha_nacimiento: [ '', Validators.required ],
      adm_rol: [ '', Validators.required ],
    });
  }

  ngOnInit(): void {
    //listar administradores
    this.AdminService.getAdmin().subscribe(respuesta => {
      this.Admins = respuesta;
    });
    //verificar rol
    this.rol = this.verifyToken.obtenerRol();
  }
  //Agregar admin
  addAdmin() {
    //formatear la fecha
    const fechaActualUtc: Date = new Date();
    const fechaFormateada: string = fechaActualUtc.toISOString().split('T')[ 0 ];
    const getRol = 'admin';
    const admins: any = {
      adm_cedula: this.form.get('adm_cedula')?.value.toString(),
      adm_nombre: this.form.get('adm_nombre')?.value,
      adm_apellido: this.form.get('adm_apellido')?.value,
      adm_password: this.form.get('adm_password')?.value,
      adm_telefono: this.form.get('adm_telefono')?.value.toString(),
      adm_email: this.form.get('adm_email')?.value,
      adm_direccion: this.form.get('adm_direccion')?.value,
      adm_fecha_nacimiento: this.form.get('adm_fecha_nacimiento')?.value,
      adm_rol: this.form.get('adm_rol')?.value,
      adm_fecha_creacion: fechaFormateada,
      rol: getRol
    }
    if (this.adm_cedula == undefined) {
      admins.adm_cedula == undefined;
      //agregar admin
      this.AdminService.addAdmin(admins).subscribe(respuesta => {
        this.ngOnInit();
        this.form.reset();
        this.toastr.success('Se agrego el administrador correctamente', 'Mensaje', {
          positionClass: 'toast-top-center',
          closeButton: true,
          timeOut: 5000,
          progressBar: true
        });
      });
    } else {
      this.AdminService.editAdmin(this.adm_cedula, admins).subscribe(respuesta => {
        this.TituloAccion = 'AGREGAR';
        this.form.reset();
        this.ngOnInit();
        this.adm_cedula = undefined;
        this.toastr.success('Se edito el administrador correctamente', 'Mensaje', {
          positionClass: 'toast-top-center',
          closeButton: true,
          timeOut: 5000,
          progressBar: true
        });
      })
    }
  }

  //obtener datos del admin a editar
  selectAdmin(admin: any) {
    this.TituloAccion = 'Editar';
    this.adm_cedula = admin.adm_cedula;
    this.form.patchValue({
      adm_cedula: admin.adm_cedula,
      adm_nombre: admin.adm_nombre,
      adm_apellido: admin.adm_apellido,
      adm_telefono: admin.adm_telefono,
      adm_email: admin.adm_email,
      adm_direccion: admin.adm_direccion,
      adm_fecha_nacimiento: admin.adm_fecha_nacimiento,
      adm_rol: admin.adm_rol,
    });
    this.toastr.info('Se cargaron los datos correctamente', 'Mensaje', {
      positionClass: 'toast-top-center',
      closeButton: true,
      timeOut: 5000,
      progressBar: true
    });
  }
  //eliminar admin
  deleteAdmin(adm_cedula: any, iControl: any) {
    if (window.confirm('¿Esta seguro que desea borrar el registro?')) {
      this.AdminService.deleteAdmin(adm_cedula).subscribe((respuesta) => {
        this.Admins.splice(iControl, 1);
        this.toastr.error('Se elimino el registro correctamente', 'Mensaje', {
          positionClass: 'toast-top-center',
          closeButton: true,
          timeOut: 5000,
          progressBar: true
        });
        console.log(respuesta);
      });
    }
  }
}
