import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class AdministradorService {
  //url API base
  BASEAPI: string = 'http://localhost:3000/api/v1/';
  ADMINAPI: string = 'admin/';
  LOGIN: string = 'login/'
  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    ) { }
  //metodo para loguin administrador
  getLoginAdmin(adm_cedula:any, adm_password:any) {
    const body = { adm_cedula, adm_password };
    return this.http.post(this.BASEAPI + this.ADMINAPI + this.LOGIN, body);
  }
  isLogin():boolean{
    const token = localStorage.getItem('token');
    if(this.jwtHelper.isTokenExpired(token) || !localStorage.getItem('token')){
      return false;
    }
    return true;
  }
  //metodos administrador
  getAdmin() {
    return this.http.get(this.BASEAPI + this.ADMINAPI);
  }

}
