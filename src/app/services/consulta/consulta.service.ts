import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {
  //url API base
  BASEAPI: string = 'http://localhost:3000/api/v1/';
  CONSULTATIONAPI: string = 'consultation/';
  DOCUMENTAPI: String = 'document/'
  constructor(
    private http: HttpClient,
  ) { }
  //Obtener todas las consultas
  getConsultation() {
    return this.http.get(this.BASEAPI + this.CONSULTATIONAPI)
  }
  //Obtener 1 consulta
  getOneConsultation(con_radicado: any) {
    return this.http.get(this.BASEAPI + this.CONSULTATIONAPI + con_radicado);
  }
  //Obtener consultas de un usuario
  getConsultUser(fk_con_gra_cedula: any) {
    return this.http.get(this.BASEAPI + this.CONSULTATIONAPI +this.DOCUMENTAPI+ fk_con_gra_cedula);
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
