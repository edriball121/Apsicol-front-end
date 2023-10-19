import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {
  //url API base
  BASEAPI: string = 'http://localhost:3000/api/v1/';
  SERVICESAPI: string = 'services/';
  constructor(
    private http: HttpClient,
  ) { }
  //Listar servicios
  getServices() {
    return this.http.get(this.BASEAPI + this.SERVICESAPI);
  }
  //Agregar granjero
  addServices(services: any): Observable<any> {
    return this.http.post(this.BASEAPI + this.SERVICESAPI, services);
  }
  //Editar granjero
  editServices(ser_codigo: any, services: any): Observable<any> {
    return this.http.patch(this.BASEAPI + this.SERVICESAPI + ser_codigo, services);
  }
  //Eliminar granjero
  deleteServices(ser_codigo: any): Observable<any> {
    return this.http.delete(this.BASEAPI + this.SERVICESAPI + ser_codigo);
  }
}
