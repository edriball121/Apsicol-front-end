import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {
  //url API base
  BASEAPI: string = 'http://localhost:3000/api/v1/';
  CONSULTATIONAPI: string = 'consultation/';
  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
  ) { }
  //Obtener todas las consultas
  getConsultation() {
    return this.http.get(this.BASEAPI + this.CONSULTATIONAPI)
  }
  //Obtener 1 consulta
  getOneConsultation(con_radicado: any) {
    return this.http.get(this.BASEAPI + this.CONSULTATIONAPI + con_radicado);
  }
  //Agregar consulta
  addConsultation(consultation: any): Observable<any>{
    return this.http.post(this.BASEAPI + this.CONSULTATIONAPI, consultation);
  }
  //Editar consulta
  editConsultation(con_radicado: any, consultation: any): Observable<any> {
    return this.http.patch(this.BASEAPI + this.CONSULTATIONAPI + con_radicado, consultation);
  }
  //Eliminar 1 consulta
  deleteConsultation(con_radicado: any): Observable<any> {
    return this.http.delete(this.BASEAPI + this.CONSULTATIONAPI + con_radicado);
  }
}
