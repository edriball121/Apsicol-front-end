import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  //url API base
  BASEAPI: string = 'http://localhost:3000/api/v1/';
  COMPANYAPI: string = 'company/';
  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
  ) { }

  //listar empresa
  getCompany() {
    return this.http.get(this.BASEAPI + this.COMPANYAPI);
  }
  //agregar empresa
  addCompany(company: any): Observable<any> {
    return this.http.post(this.BASEAPI + this.COMPANYAPI, company);
  }
  //editar empresa
  editCompany(emp_codigo: any, Company: any): Observable<any> {
    return this.http.patch(this.BASEAPI + this.COMPANYAPI + emp_codigo, Company);
  }
  //eliminar empresa
  deleteCompany(emp_codigo: any): Observable<any> {
    return this.http.delete(this.BASEAPI + this.COMPANYAPI + emp_codigo);
  }
}
