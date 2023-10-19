import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ServiciosService } from './../../services/servicios/servicios.service';
import { EmpresaService } from './../../services/empresa/empresa.service';
import { ToastrService } from 'ngx-toastr';
import { VerifyToken } from './../../services/verify-token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: [ './servicios.component.css' ]
})
export class ServiciosComponent implements OnInit {
  form: FormGroup;
  Services: any;
  Companys: any;
  TituloAccion = 'Agregar';
  ser_codigo: string | undefined;
  rol!: string;
  base64Image: string = '';
  imagenUrl!: string;
  selectedService: any;
  constructor(
    private fb: FormBuilder,
    private ServicesService: ServiciosService,
    private companyService: EmpresaService,
    private toastr: ToastrService,
    private verifyToken: VerifyToken,
  ) {
    //restricciones del formulario
    this.form = this.fb.group({
      ser_nombre: [ '' ],
      ser_descripcion: [ '' ],
      ser_valor: [ '' ],
      ser_foto: [ '' ],
      fk_ser_emp_codigo: [ '' ],
    });
  }
  ngOnInit(): void {
    this.getServices();
    this.getCompanys();
    //verificar rol
    this.rol = this.verifyToken.obtenerRol();
  }
  //Listar services
  getServices() {
    this.ServicesService.getServices().subscribe(respuesta => {
      this.Services = respuesta;
    });
  }
  //Listar empresas
  getCompanys() {
    this.companyService.getCompany().subscribe(respuesta => {
      this.Companys = respuesta;
    });
  }
  //seleccionar un servicio
  selectOneService(service: any) {
    this.selectedService = service;
  }
  //Agregar servicios
  addService() {
    const Service: any = {
      ser_codigo: this.ser_codigo,
      ser_nombre: this.form.get('ser_nombre')?.value,
      ser_descripcion: this.form.get('ser_descripcion')?.value,
      ser_valor: this.form.get('ser_valor')?.value,
      fk_ser_emp_codigo: this.form.get('fk_ser_emp_codigo')?.value,
      ser_foto: this.base64Image,
    }
    //Agregar servicio
    if (this.ser_codigo === undefined) {
      this.ServicesService.addServices(Service).subscribe(respuesta => {
        this.ngOnInit();
        this.form.reset();
        this.toastr.success('Se agrego el producto correctamente', 'Mensaje', {
          positionClass: 'toast-top-center',
          closeButton: true,
          timeOut: 5000,
          progressBar: true
        });
      });
    }
    //Editar servicio
    else {
      this.ServicesService.editServices(this.ser_codigo, Service).subscribe(respuesta => {
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
  //Seleccionar servicio a editar
  selectService(Service: any) {
    this.TituloAccion = 'Editar';
    this.ser_codigo = Service.ser_codigo,
      this.form.patchValue({
        ser_codigo: this.ser_codigo,
        ser_nombre: Service.ser_nombre,
        ser_descripcion: Service.ser_descripcion,
        ser_valor: Service.ser_valor,
        fk_ser_emp_codigo: Service.FK_ser_emp_codigo,
      });
    this.imagenUrl = Service.ser_foto;
  }
  //Eliminar producto
  deleteService(ser_codigo: any, iControl: any) {
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
        this.ServicesService.deleteServices(ser_codigo).subscribe((respuesta) => {
          this.Services.splice(iControl, 1);
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

}
