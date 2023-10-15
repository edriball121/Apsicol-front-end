import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { EmpleoService } from './../../services/empleo/empleo.service';
import { ToastrService } from 'ngx-toastr';
import { VerifyToken } from './../../services/verify-token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-empleo',
  templateUrl: './empleo.component.html',
  styleUrls: ['./empleo.component.css']
})
export class EmpleoComponent implements OnInit {
  form: FormGroup;
  Jobs: any;
  TituloAccion = 'Agregar';
  emp_codigo: string | undefined;
  rol!: string;
  constructor(
    private fb: FormBuilder,
    private JobService: EmpleoService,
    private toastr: ToastrService,
    private verifyToken: VerifyToken,
  ) {
    //restricciones del formulario
    this.form = this.fb.group({
      emp_nombre: [''],
      emp_terminos_y_condiciones: [''],
      emp_descripcion: [''],
    })
  }

  ngOnInit(): void {
    this.getJobs();
    //verificar rol
    this.rol = this.verifyToken.obtenerRol();
  }

  //Listar empleos
  getJobs() {
    this.JobService.getJob().subscribe(respuesta => {
      this.Jobs = respuesta;
      console.log(this.Jobs);
    })
  }
  //Agregar empleo
  addJob() {
    //formatear la fecha
    const fechaActualUtc: Date = new Date();
    const fechaFormateada: string = fechaActualUtc.toISOString().split('T')[0];
    const Jobs: any = {
      emp_codigo: this.emp_codigo,
      emp_nombre: this.form.get('emp_nombre')?.value,
      emp_terminos_y_condiciones: this.form.get('emp_terminos_y_condiciones')?.value,
      emp_fecha_creacion: fechaFormateada,
      emp_descripcion: this.form.get('emp_descripcion')?.value,
    }
    //Agregar empleo
    if (this.emp_codigo === undefined) {
      Jobs.emp_codigo == undefined;
      this.JobService.addJob(Jobs).subscribe(respuesta => {
        this.ngOnInit();
        this.form.reset();
        this.toastr.success('Se agrego el empleo correctamente', 'Mensaje', {
          positionClass: 'toast-top-center',
          closeButton: true,
          timeOut: 5000,
          progressBar: true
        });
      })
    } else {
      this.JobService.editJob(this.emp_codigo, Jobs).subscribe(respuesta => {
        this.TituloAccion = 'agregar';
        this.form.reset();
        this.ngOnInit();
        this.emp_codigo = undefined;
        this.toastr.success('Se edito el administrador correctamente', 'Mensaje', {
          positionClass: 'toast-top-center',
          closeButton: true,
          timeOut: 5000,
          progressBar: true
        });
      });
    }
  }
  //Obtener datos trabajo a editar
  selectJob(Jobs: any) {
    this.TituloAccion = 'Editar';
    this.emp_codigo = Jobs.emp_codigo;
    this.form.patchValue({
      emp_codigo: Jobs.emp_codigo,
      emp_nombre: Jobs.emp_nombre,
      emp_terminos_y_condiciones: Jobs.emp_terminos_y_condiciones,
      emp_descripcion: Jobs.emp_descripcion,
    })
  }
  //Eliminar trabajo
  deleteJob(emp_codigo: any, iControl: any) {
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
        this.JobService.deleteJob(emp_codigo).subscribe((respuesta) => {
          this.Jobs.splice(iControl, 1);
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
