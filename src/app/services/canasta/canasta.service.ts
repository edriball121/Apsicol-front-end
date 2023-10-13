import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CanastaService {
  //url API base
  BASEAPI: string = 'http://localhost:3000/api/v1/';
  FAMILYBASKETAPI: string = 'familyBasket/';
  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
  ) { }

  //listar Canasta familiar
  getFamilyBasket() {
    return this.http.get(this.BASEAPI + this.FAMILYBASKETAPI);
  }
  //agregar Canasta familiar
  addFamilyBasket(familyBasket: any): Observable<any> {
    return this.http.post(this.BASEAPI + this.FAMILYBASKETAPI, familyBasket);
  }
  //editar Canasta familiar
  editFamilyBasket(cta_codigo: any, familyBasket: any): Observable<any> {
    return this.http.patch(this.BASEAPI + this.FAMILYBASKETAPI + cta_codigo, familyBasket);
  }
  //eliminar Canasta familiar
  deleteFamilyBasket(cta_codigo: any): Observable<any> {
    return this.http.delete(this.BASEAPI + this.FAMILYBASKETAPI + cta_codigo);
  }
}
