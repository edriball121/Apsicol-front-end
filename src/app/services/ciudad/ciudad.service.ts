import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CiudadService {
  //url API base
  BASEAPI: string = 'http://localhost:3000/api/v1/';
  CITYAPI: string = 'city/';
  constructor(private http: HttpClient) { }
  //Listar ciudades
  getCity() {
    return this.http.get(this.BASEAPI + this.CITYAPI);
  }
  //Agregar Ciudad
  addCity(city: any): Observable<any> {
    return this.http.post(this.BASEAPI + this.CITYAPI, city);
  }
  //Editar Ciudad
  editCity(ciu_codigo: any, city: any): Observable<any> {
    return this.http.patch(this.BASEAPI + this.CITYAPI + ciu_codigo, city);
  }
  //Eliminar Ciudad
  deleteCity(ciu_codigo: any): Observable<any> {
    return this.http.delete(this.BASEAPI + this.CITYAPI + ciu_codigo);
  }
}
