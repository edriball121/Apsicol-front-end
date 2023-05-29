import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
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
  getLoginAdmin(adm_cedula: any, adm_password: any) {
    const body = { adm_cedula, adm_password };
    return this.http.post(this.BASEAPI + this.ADMINAPI + this.LOGIN, body);
  }
  isLogin(): boolean {
    const token = localStorage.getItem('token');
    if (this.jwtHelper.isTokenExpired(token) || !localStorage.getItem('token')) {
      return false;
    }
    return true;
  }
  //listar administrador
  getAdmin() {
    return this.http.get(this.BASEAPI + this.ADMINAPI);
  }
  //agregar administrador
  addAdmin(admin: any): Observable<any> {
    return this.http.post(this.BASEAPI + this.ADMINAPI, admin);
  }
  //editar administrador
  editAdmin(adm_cedula: any, admin: any): Observable<any> {
    return this.http.patch(this.BASEAPI + this.ADMINAPI + adm_cedula, admin);
  }
  //eliminar administrador
  deleteAdmin(adm_cedula: any): Observable<any> {
    return this.http.delete(this.BASEAPI + this.ADMINAPI + adm_cedula);
  }
}
