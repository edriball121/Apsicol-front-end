import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FincaService {
  //url API base
  BASEAPI: string = 'http://localhost:3000/api/v1/';
  FARMAPI: string = 'farm/';
  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
  ) { }
  //listar finca
  getFarm() {
    return this.http.get(this.BASEAPI + this.FARMAPI);
  }
  //agregar finca
  addFarm(farm: any): Observable<any> {
    return this.http.post(this.BASEAPI + this.FARMAPI, farm);
  }
  //editar finca
  editFarm(fin_codigo: any, farm: any): Observable<any> {
    return this.http.patch(this.BASEAPI + this.FARMAPI + fin_codigo, farm);
  }
  //eliminar finca
  deleteFarm(fin_codigo: any): Observable<any> {
    return this.http.delete(this.BASEAPI + this.FARMAPI + fin_codigo);
  }
}
