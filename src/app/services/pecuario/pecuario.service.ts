import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PecuarioService {

  //url API base
  BASEAPI: string = 'http://localhost:3000/api/v1/';
  LIVESTOCKAPI: string = 'livestock/';
  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
  ) { }
  //listar Agricola
  getLivestock() {
    return this.http.get(this.BASEAPI + this.LIVESTOCKAPI);
  }
  //agregar Agricola
  addLivestock(livestock: any): Observable<any> {
    return this.http.post(this.BASEAPI + this.LIVESTOCKAPI, livestock);
  }
  //editar Agricola
  editLivestock(Ape_codigo: any, livestock: any): Observable<any> {
    return this.http.patch(this.BASEAPI + this.LIVESTOCKAPI + Ape_codigo, livestock);
  }
  //eliminar Agricola
  deleteLivestock(Ape_codigo: any): Observable<any> {
    console.log(Ape_codigo);
    return this.http.delete(this.BASEAPI + this.LIVESTOCKAPI + Ape_codigo);
  }
}
