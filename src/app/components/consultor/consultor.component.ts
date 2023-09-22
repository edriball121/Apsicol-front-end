import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ConsultorService } from './../../services/consultor/consultor.service';
import { ToastrService } from 'ngx-toastr';
import { VerifyToken } from './../../services/verify-token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-consultor',
  templateUrl: './consultor.component.html',
  styleUrls: ['./consultor.component.css']
})
export class ConsultorComponent implements OnInit {
  form: FormGroup;
  Consultants: any;
  TituloAccion = 'Agregar';
  con_cedula: string | undefined;
  rol!: string;
  constructor(
    private fb: FormBuilder,
    private ConsultantService: ConsultorService,
    private toastr: ToastrService,
    private verifyToken: VerifyToken,
  ) {
    //Restricciones del formulario
    this.form = this.fb.group({
      con_cedula: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(11)]],
      con_nombre: ['', Validators.required],
      con_apellido: ['', Validators.required],
      con_password: ['', Validators.required],
      con_telefono: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(11)]],
      con_email: ['', [Validators.required, Validators.email]],
      con_fecha_nacimiento: ['', Validators.required],
      con_direccion: ['', Validators.required],
      con_profesion: ['', Validators.required],
      con_annos_experiencia: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    //llamar Listar consultores
    this.listConsultant();
    //verificar rol
    this.rol = this.verifyToken.obtenerRol();
  }
  //Listar consultores
  listConsultant() {
    this.ConsultantService.getConsultant().subscribe(respuesta => {
      this.Consultants = respuesta;
    });
  }

  //Agregar consultor
  addConsultant() {
    //formatear la fecha
    const fechaActualUtc: Date = new Date();
    const fechaFormateada: string = fechaActualUtc.toISOString().split('T')[0];
    const getRol = 'consultant';
    //capturar los valores del formulario
    const consultants: any = {
      con_cedula: this.form.get('con_cedula')?.value.toString(),
      con_nombre: this.form.get('con_nombre')?.value,
      con_apellido: this.form.get('con_apellido')?.value,
      con_password: this.form.get('con_password')?.value,
      con_telefono: this.form.get('con_telefono')?.value.toString(),
      con_email: this.form.get('con_email')?.value,
      con_direccion: this.form.get('con_direccion')?.value,
      con_fecha_nacimiento: this.form.get('con_fecha_nacimiento')?.value,
      con_fecha_creacion: fechaFormateada,
      con_profesion: this.form.get('con_profesion')?.value,
      con_annos_experiencia: this.form.get('con_annos_experiencia')?.value.toString(),
      rol: getRol
    }
    if (this.con_cedula == undefined) {
      consultants.con_cedula == undefined;
      //Agregar consultor
      this.ConsultantService.addConsultant(consultants).subscribe(respuesta => {
        this.ngOnInit();
        this.form.reset();
        this.toastr.success('Se agrego el consultor correctamente', 'Mensaje', {
          positionClass: 'toast-top-center',
          closeButton: true,
          timeOut: 5000,
          progressBar: true
        });
      });
    } else {
      //Editar consultor
      this.ConsultantService.editConsultant(this.con_cedula, consultants).subscribe(respuesta => {
        this.TituloAccion = 'agregar';
        this.form.reset();
        this.ngOnInit();
        this.con_cedula = undefined;
        this.toastr.success('Se edito el consultor correctamente', 'Mensaje', {
          positionClass: 'toast-top-center',
          closeButton: true,
          timeOut: 5000,
          progressBar: true
        });
      })
    }
  }

  //obtener datos del consultor a editar
  selectConsultant(consultant: any) {
    this.TituloAccion = 'Editar';
    this.con_cedula = consultant.con_cedula;
    console.log(this.con_cedula);
    this.form.patchValue({
      con_cedula: consultant.con_cedula,
      con_nombre: consultant.con_nombre,
      con_apellido: consultant.con_apellido,
      con_telefono: consultant.con_telefono,
      con_email: consultant.con_email,
      con_direccion: consultant.con_direccion,
      con_fecha_nacimiento: consultant.con_fecha_nacimiento,
      con_profesion: consultant.con_profesion,
      con_annos_experiencia: consultant.con_annos_experiencia,
    });
    this.toastr.info('Se cargaron los datos correctamente', 'Mensaje', {
      positionClass: 'toast-top-center',
      closeButton: true,
      timeOut: 5000,
      progressBar: true
    });
  }
  //eliminar consultor
  deleteConsultant(con_cedula: any, iControl: any) {
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
        this.ConsultantService.deleteConsultant(con_cedula).subscribe((respuesta) => {
          this.Consultants.splice(iControl, 1);
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
}
