import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ConsultorService {
  //url API base
  BASEAPI: string = 'http://localhost:3000/api/v1/';
  CONSULTANTAPI: string = 'consultant/';
  LOGIN: string = 'login/'
  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
  ) { }
  //metodo para loguin administrador
  getLoginConsultant(con_cedula: any, con_password: any) {
    const body = { con_cedula, con_password };
    return this.http.post(this.BASEAPI + this.CONSULTANTAPI + this.LOGIN, body);
  }
  isLogin(): boolean {
    const token = localStorage.getItem('token');
    if (this.jwtHelper.isTokenExpired(token) || !localStorage.getItem('token')) {
      return false;
    }
    return true;
  }
  //listar consultor
  getConsultant() {
    return this.http.get(this.BASEAPI + this.CONSULTANTAPI);
  }
  //agregar consultor
  addConsultant(consultant: any): Observable<any> {
    return this.http.post(this.BASEAPI + this.CONSULTANTAPI, consultant);
  }
  //editar consultor
  editConsultant(con_cedula: any, consultant: any): Observable<any> {
    return this.http.patch(this.BASEAPI + this.CONSULTANTAPI + con_cedula, consultant);
  }
  //eliminar consultor
  deleteConsultant(con_cedula: any): Observable<any> {
    return this.http.delete(this.BASEAPI + this.CONSULTANTAPI + con_cedula);
  }
}
