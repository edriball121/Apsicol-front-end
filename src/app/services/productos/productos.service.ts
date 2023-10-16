import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  //url API base
  BASEAPI: string = 'http://localhost:3000/api/v1/';
  PRODUCTAPI: string = 'product/';
  constructor(
    private http: HttpClient,
  ) { }
  //listar producto
  getProduct() {
    return this.http.get(this.BASEAPI + this.PRODUCTAPI);
  }
  //agregar producto
  addProduct(product: any): Observable<any> {
    return this.http.post(this.BASEAPI + this.PRODUCTAPI, product);
  }
  //editar producto
  editProduct(pro_codigo: any, product: any): Observable<any> {
    return this.http.patch(this.BASEAPI + this.PRODUCTAPI + pro_codigo, product);
  }
  //eliminar producto
  deleteProduct(pro_codigo: any): Observable<any> {
    return this.http.delete(this.BASEAPI + this.PRODUCTAPI + pro_codigo);
  }
}
