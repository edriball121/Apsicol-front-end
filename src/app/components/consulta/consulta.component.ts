import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ConsultaService } from './../../services/consulta/consulta.service';
import { ToastrService } from 'ngx-toastr';
import { VerifyToken } from './../../services/verify-token.service'

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: [ './consulta.component.css' ]
})
export class ConsultaComponent implements OnInit {
  form: FormGroup;
  Consultations: any;
  TituloAccion = 'Agregar';
  con_radicado: number | undefined;
  rol!: string;
  constructor(
    private fb: FormBuilder,
    private ConsultaService: ConsultaService,
    private toastr: ToastrService,
    private verifyToken: VerifyToken,
  ) {
    //restricciones del formulario
    this.form = this.fb.group({
      con_nombre: [ '', Validators.required ],
      con_tipo_consulta: [ '', Validators.required ],
      con_descripcion: [ '', Validators.required ],
    });
  }

  ngOnInit(): void {
    //listar consultas
    this.ConsultaService.getConsultarion().subscribe(respuesta => {
      this.Consultations = respuesta;

    });
    //verificar rol
    this.rol = this.verifyToken.obtenerRol();
  }
  //agregar consulta
  addConsultation() {
    //agregar y formatear fecha del sistema
    const fechaActualUtc: Date = new Date();
    const fechaFormateada: string = fechaActualUtc.toISOString().split('T')[ 0 ];
    //asignación temporal de la cedula del granjero, se debe cambiar
    //al implementar el modulo de granjero
    const FK_con_gra_cedula = '1057758133';
    const calificacion = 'Pendiente';
    const estado = 'Abierto';
    //capturar los valores del formulario
    const consults: any = {
      con_nombre: this.form.get('con_nombre')?.value,
      con_tipo_consulta: this.form.get('con_tipo_consulta')?.value,
      con_descripcion: this.form.get('con_descripcion')?.value,
      con_fecha: fechaFormateada,
      con_estado: estado,
      con_calificacion: calificacion,
      con_fecha_finalizacion: fechaFormateada,
      fk_con_gra_cedula: FK_con_gra_cedula,
    }
    if (this.con_radicado == undefined) {
      consults.con_radicado = 0;
      console.log(consults);
      this.ConsultaService.addConsultation(consults).subscribe(respuesta => {
        try {
          this.ngOnInit();
          this.form.reset();
          this.toastr.success('Se agrego la consulta correctamente', 'Mensaje', {
            positionClass: 'toast-top-center',
            closeButton: true,
            timeOut: 5000,
            progressBar: true
          });
        } catch (error) {
          console.log(error);
        }
      })
    }else{
      consults.con_radicado = this.form.get('con_radicado')?.value,
      this.ConsultaService.editConsultation(this.con_radicado, consults).subscribe(respuesta=>{
        this.TituloAccion = 'agregar';
        this.form.reset();
        this.ngOnInit();
        this.con_radicado = undefined;
        this.toastr.success('Se edito la consulta correctamente', 'Mensaje', {
          positionClass: 'toast-top-center',
          closeButton: true,
          timeOut: 5000,
          progressBar: true
        });
      })
    }



  }
  //obtener los datos del formulario de consulta para editarlo
  selectConsultation(Consultation: any) {
    this.TituloAccion = 'Editar';
    this.con_radicado = Consultation.con_radicado;
    this.form.patchValue({
      con_radicado: Consultation.con_radicado,
      con_nombre: Consultation.con_nombre,
      con_tipo_consulta: Consultation.con_tipo_consulta,
      con_descripcion: Consultation.con_descripcion,
      con_estado: Consultation.con_estado,
      con_calificacion: Consultation.con_calificacion,
      con_fecha_finalizacion: Consultation.con_fecha_finalizacion
    });
    this.toastr.info('Se cargo la consulta correctamente', 'Mensaje', {
      positionClass: 'toast-top-center',
      closeButton: true,
      timeOut: 5000,
      progressBar: true
    });
  }
  deleteConsultation(con_radicado: any, iControl: any) {
    if (window.confirm('¿Esta seguro que desea borrar el registro?')) {
      this.ConsultaService.deleteConsultation(con_radicado).subscribe((respuesta) => {
        this.Consultations.splice(iControl, 1);
        this.toastr.error('Se elimino el registro correctamente', 'Mensaje', {
          positionClass: 'toast-top-center',
          closeButton: true,
          timeOut: 5000,
          progressBar: true
        });
        console.log(respuesta);
      })
    }
  }
}
