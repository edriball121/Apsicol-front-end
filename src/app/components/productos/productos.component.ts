import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ProductosService } from './../../services/productos/productos.service';
import { ToastrService } from 'ngx-toastr';
import { VerifyToken } from './../../services/verify-token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  form: FormGroup;
  Products: any;
  TituloAccion = 'Agregar';
  pro_codigo: string | undefined;
  rol!: string;
  base64Image: string = '';
  imagenUrl!: string;
  constructor(
    private fb: FormBuilder,
    private ProductService: ProductosService,
    private toastr: ToastrService,
    private verifyToken: VerifyToken,
  ) {
    //restricciones del formulario
    this.form = this.fb.group({
      pro_nombre: [''],
      pro_descripcion: [''],
      pro_precio: [''],
      pro_estado: [''],
      pro_cantidad: [''],
      pro_terminos_y_condiciones: [''],
      pro_foto: [''],
    });
  }

  ngOnInit(): void {
    this.listProducts();
    //verificar rol
    this.rol = this.verifyToken.obtenerRol();
  }
  //Listar productos
  listProducts() {
    this.ProductService.getProduct().subscribe(respuesta => {
      this.Products = respuesta;
      console.log(respuesta);
    })
  }
  //Agregar productos
  addProduct() {
    const Product: any = {
      pro_codigo: this.pro_codigo,
      pro_nombre: this.form.get('pro_nombre')?.value,
      pro_descripcion: this.form.get('pro_descripcion')?.value,
      pro_precio: this.form.get('pro_precio')?.value,
      pro_estado: this.form.get('pro_estado')?.value,
      pro_cantidad: this.form.get('pro_cantidad')?.value,
      pro_terminos_y_condiciones: this.form.get('pro_terminos_y_condiciones')?.value,
      pro_foto: this.base64Image,
    }
    //agregar producto
    if (this.pro_codigo === undefined) {
      this.ProductService.addProduct(Product).subscribe(respuesta => {
        this.ngOnInit();
        this.form.reset();
        this.toastr.success('Se agrego el producto correctamente', 'Mensaje', {
          positionClass: 'toast-top-center',
          closeButton: true,
          timeOut: 5000,
          progressBar: true
        });
      });
    } else {//editar producto
      this.ProductService.editProduct(this.pro_codigo, Product).subscribe(respuesta => {
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
  //Seleccionar producto a editar
  selectProduct(Product: any) {
    this.TituloAccion = 'Editar';
    this.pro_codigo = Product.pro_codigo,
      this.form.patchValue({
        pro_codigo: this.pro_codigo,
        pro_nombre: Product.pro_nombre,
        pro_descripcion: Product.pro_descripcion,
        pro_precio: Product.pro_precio,
        pro_estado: Product.pro_estado,
        pro_cantidad: Product.pro_cantidad,
        pro_terminos_y_condiciones: Product.pro_terminos_y_condiciones,
      });
    this.imagenUrl = Product.pro_foto;
  }
  //Eliminar producto
  deleteProduct(pro_codigo: any, iControl: any) {
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
        this.ProductService.deleteProduct(pro_codigo).subscribe((respuesta) => {
          this.Products.splice(iControl, 1);
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
