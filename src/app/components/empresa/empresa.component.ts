import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmpresaService } from './../../services/empresa/empresa.service';
import { ToastrService } from 'ngx-toastr';
import { VerifyToken } from './../../services/verify-token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css']
})
export class EmpresaComponent implements OnInit {
  form: FormGroup;
  Companys: any;
  TituloAccion = 'Agregar';
  base64Image: string = '';
  emp_codigo!: string;
  rol!: string;
  imagenUrl!: string;
  constructor(
    private fb: FormBuilder,
    private CompanyService: EmpresaService,
    private toastr: ToastrService,
    private verifyToken: VerifyToken,
  ) {
    //restriccio(n del formulario
    this.form = this.fb.group({
      emp_nombre: [''],
      emp_descripcion: [''],
      emp_telefono: [''],
      emp_foto: [''],
      emp_subtitulo: [''],
    });
  }

  ngOnInit(): void {
    this.getCompanys();
    //verificar rol
    this.rol = this.verifyToken.obtenerRol();
  }
  //Obtener empresas
  getCompanys() {
    this.CompanyService.getCompany().subscribe(respuesta => {
      this.Companys = respuesta;
    })
  };
  //Agregar/Editar empresa
  addCompany() {
    const Companys: any = {
      emp_codigo: this.emp_codigo,
      emp_nombre: this.form.get('emp_nombre')?.value,
      emp_descripcion: this.form.get('emp_descripcion')?.value,
      emp_telefono: this.form.get('emp_telefono')?.value,
      emp_foto: this.base64Image,
      emp_subtitulo: this.form.get('emp_subtitulo')?.value,
    }
    if (this.emp_codigo === undefined) {
      //agregar empresa
      this.CompanyService.addCompany(Companys).subscribe(respuesta => {
        this.ngOnInit();
        this.form.reset();
        this.toastr.success('Se agrego la empresa correctamente', 'Mensaje', {
          positionClass: 'toast-top-center',
          closeButton: true,
          timeOut: 5000,
          progressBar: true
        });
      })
    } else {
      //editar noticia
      this.CompanyService.editCompany(this.emp_codigo, Companys).subscribe(respuesta => {
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
  //Seleccionar empresa
  selectCompany(Companys: any) {
    this.TituloAccion = 'Editar';
    this.emp_codigo = Companys.emp_codigo;
    this.form.patchValue({
      emp_codigo: this.emp_codigo,
      emp_nombre: Companys.emp_nombre,
      emp_subtitulo: Companys.emp_subtitulo,
      emp_descripcion: Companys.emp_descripcion,
      emp_telefono: Companys.emp_telefono,
    });
    this.imagenUrl = Companys.not_foto
  }
  //Eliminar empresa
  deleteCompany(emp_codigo: any, iControl: any) {
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
        this.CompanyService.deleteCompany(emp_codigo).subscribe((respuesta) => {
          this.Companys.splice(iControl, 1);
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
