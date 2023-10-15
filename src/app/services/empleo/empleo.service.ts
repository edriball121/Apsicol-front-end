import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleoService {
  //url API base
  BASEAPI: string = 'http://localhost:3000/api/v1/';
  JOBAPI: string = 'job/';
  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
  ) { }

  //listar empleo
  getJob() {
    return this.http.get(this.BASEAPI + this.JOBAPI);
  }
  //agregar empleo
  addJob(job: any): Observable<any> {
    return this.http.post(this.BASEAPI + this.JOBAPI, job);
  }
  //editar empleo
  editJob(emp_codigo: any, job: any): Observable<any> {
    return this.http.patch(this.BASEAPI + this.JOBAPI + emp_codigo, job);
  }
  //eliminar empleo
  deleteJob(emp_codigo: any): Observable<any> {
    return this.http.delete(this.BASEAPI + this.JOBAPI + emp_codigo);
  }
}
