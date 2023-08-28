import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

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
  getLoginFarmer(gra_cedula: any, gra_password: any) {
    const body = { gra_cedula, gra_password };
    return this.http.post(this.BASEAPI + this.FARMERAPI + this.LOGIN, body);
  }
  isLogin(): boolean {
    const token = localStorage.getItem('token');
    if (this.jwtHelper.isTokenExpired(token) || !localStorage.getItem('token')) {
      return false;
    }
    return true;
  }

  //Listar granjeros
  getFarmer() {
    return this.http.get(this.BASEAPI + this.FARMERAPI);
  }
  //Agregar granjero
  addFarmer(farmer: any): Observable<any> {
    return this.http.post(this.BASEAPI + this.FARMERAPI, farmer);
  }
  //Editar granjero
  editFarmer(gra_cedula: any, farmer: any): Observable<any> {
    return this.http.patch(this.BASEAPI + this.FARMERAPI + gra_cedula, farmer);
  }
  //Eliminar granjero
  deleteFarmer(gra_cedula: any): Observable<any> {
    return this.http.delete(this.BASEAPI + this.FARMERAPI + gra_cedula);
  }
}
