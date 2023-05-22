import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class GranjeroService {
//url API base
BASEAPI: string = 'http://localhost:3000/api/v1/';
FARMERAPI: string = 'farmer/';
LOGIN: string = 'login/'
  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
  ) { }
  //metodo para loguin granjero
  getLoginFarmer(gra_cedula:any, gra_password:any) {
    const body = { gra_cedula, gra_password };
    return this.http.post(this.BASEAPI + this.FARMERAPI + this.LOGIN, body);
  }
  isLogin():boolean{
    const token = localStorage.getItem('token');
    if(this.jwtHelper.isTokenExpired(token) || !localStorage.getItem('token')){
      return false;
    }
    return true;
  }
}
