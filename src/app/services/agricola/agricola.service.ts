import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgricolaService {
  //url API base
  BASEAPI: string = 'http://localhost:3000/api/v1/';
  FARMINGAPI: string = 'farming/';
  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
  ) { }
  //listar Agricola
  getFarmig() {
    return this.http.get(this.BASEAPI + this.FARMINGAPI);
  }
  //agregar Agricola
  addFarmig(farming: any): Observable<any> {
    return this.http.post(this.BASEAPI + this.FARMINGAPI, farming);
  }
  //editar Agricola
  editFarmig(Ape_codigo: any, farming: any): Observable<any> {
    return this.http.patch(this.BASEAPI + this.FARMINGAPI + Ape_codigo, farming);
  }
  //eliminar Agricola
  deleteFarmig(Ape_codigo: any): Observable<any> {
    return this.http.delete(this.BASEAPI + this.FARMINGAPI + Ape_codigo);
  }
}


