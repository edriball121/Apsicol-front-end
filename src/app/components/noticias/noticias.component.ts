import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NoticiasService } from './../../services/noticias/noticias.service';
import { ToastrService } from 'ngx-toastr';
import { VerifyToken } from './../../services/verify-token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: [ './noticias.component.css' ]
})
export class NoticiasComponent implements OnInit {
  form: FormGroup;
  News: any;
  TituloAccion = 'Agregar';
  adm_cedula!: string;
  fk_not_adm_cedula!: string;
  not_codigo!: string;
  base64Image: string = '';
  rol!: string;
  imagenUrl!: string;
  constructor(
    private fb: FormBuilder,
    private NewsService: NoticiasService,
    private toastr: ToastrService,
    private verifyToken: VerifyToken,
  ) {
    //restriccion del formulario
    this.form = this.fb.group({
      not_nombre: [ '', Validators.required ],
      not_descripcion: [ '', Validators.required ],
      not_foto: [ '' ],
      not_url: [ '', Validators.required ],
      not_subtitulo: [ '', Validators.required ],
    })
  }

  ngOnInit(): void {
    this.getNews();
    //verificar rol
    this.rol = this.verifyToken.obtenerRol();
  }
  getNews() {
    //listar noticias
    this.NewsService.getNews().subscribe(respuesta => {
      this.News = respuesta;
    });
  }
  addNews() {
    //formatear la fecha
    const fechaActualUtc: Date = new Date();
    const fechaFormateada: string = fechaActualUtc.toISOString().split('T')[ 0 ];
    this.adm_cedula = this.verifyToken.obtenerCedulaUsuario();
    const News: any = {
      not_codigo: this.not_codigo,
      not_nombre: this.form.get('not_nombre')?.value,
      not_descripcion: this.form.get('not_descripcion')?.value,
      not_foto: this.base64Image,
      not_fecha_creacion: fechaFormateada,
      not_url: this.form.get('not_url')?.value,
      fk_not_adm_cedula: this.adm_cedula,
      not_subtitulo: this.form.get('not_subtitulo')?.value,
    }

    if (this.TituloAccion == 'Agregar') {
      //agregar noticia
      this.NewsService.addNews(News).subscribe(respuesta => {
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
      //editar noticia
      this.NewsService.editNews(this.not_codigo, News).subscribe(respuesta => {
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
  selectNews(News: any) {
    this.TituloAccion = 'Editar';
    this.not_codigo = News.not_codigo;
    this.form.patchValue({
      not_codigo: this.not_codigo,
      not_nombre: News.not_nombre,
      not_descripcion: News.not_descripcion,
      not_url: News.not_url,
      not_subtitulo: News.not_subtitulo,
    });
    this.imagenUrl = News.not_foto
  }
  deleteNews(not_codigo: any, iControl: any) {
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
        this.NewsService.deleteNews(not_codigo).subscribe((respuesta) => {
          this.News.splice(iControl, 1);
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
