import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class VerifyToken {
  private estaLogueadoSubject = new BehaviorSubject<boolean>(false);
  estaLogueado$ = this.estaLogueadoSubject.asObservable();
  constructor(private jwtHelper: JwtHelperService) { }

  validarToken(): void {
    const token = localStorage.getItem('token');
    const estaLogueado = !!token;
    this.estaLogueadoSubject.next(estaLogueado);
  }
  obtenerNombreUsuario(): string {
    const token = localStorage.getItem('token');
    const decodedToken = this.jwtHelper.decodeToken(token!);
    const nombreUsuario = decodedToken.adm_nombre;
    const apellidoUsuario = decodedToken.adm_apellido;
    const estaLogueado = !!token;
    this.estaLogueadoSubject.next(estaLogueado);
    return nombreUsuario + ' ' + apellidoUsuario;
  }
  obtenerRol(): string {
    const token = localStorage.getItem('token');
    const decodedToken = this.jwtHelper.decodeToken(token!);
    const estaLogueado = !!token;
    this.estaLogueadoSubject.next(estaLogueado);
    const rol = decodedToken.rol;
    return rol;
  }
  destruirToken(): void {
    localStorage.removeItem('token');
    this.validarToken();
    const token = localStorage.getItem('token');
    const estaLogueado = !!token;
    this.estaLogueadoSubject.next(estaLogueado);
  }
}
