import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

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
  getLoginConsultant(con_cedula:any, con_password:any) {
    const body = { con_cedula, con_password };
    return this.http.post(this.BASEAPI + this.CONSULTANTAPI + this.LOGIN, body);
  }
  isLogin():boolean{
    const token = localStorage.getItem('token');
    if(this.jwtHelper.isTokenExpired(token) || !localStorage.getItem('token')){
      return false;
    }
    return true;
  }
}
