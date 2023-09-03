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
    let nombreUsuario;
    //const estaLogueado = !!token;
    if (decodedToken.adm_nombre) {
      nombreUsuario = decodedToken.adm_nombre + ' ' + decodedToken.adm_apellido;
    } else if (decodedToken.con_nombre) {
      nombreUsuario = decodedToken.con_nombre + ' ' + decodedToken.con_apellido;
    } else if (decodedToken.gra_nombre) {
      nombreUsuario = decodedToken.gra_nombre + ' ' + decodedToken.gra_apellido;
    } else {
      // Lógica en caso de que no se encuentre ninguno de los prefijos esperados
      nombreUsuario = 'Ingresar';
    }
    //this.estaLogueadoSubject.next(estaLogueado);
    return nombreUsuario;

  }
  obtenerCedulaUsuario():string{
    const token = localStorage.getItem('token');
    const decodedToken = this.jwtHelper.decodeToken(token!);
    let cedulaUsuario;
    //const estaLogueado = !!token;
    if(decodedToken.adm_cedula){
      cedulaUsuario = decodedToken.adm_cedula;
    }else if(decodedToken.con_cedula){
      cedulaUsuario = decodedToken.con_cedula;
    }else if(decodedToken.gra_cedula){
      cedulaUsuario = decodedToken.gra_cedula;
    }
    //this.estaLogueadoSubject.next(estaLogueado);
    return cedulaUsuario;
  }
  obtenerRol(): string {
    const token = localStorage.getItem('token');
    const decodedToken = this.jwtHelper.decodeToken(token!);
    //const estaLogueado = !!token;
    //this.estaLogueadoSubject.next(estaLogueado);
    const rol = decodedToken?.rol??"undefinied";
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
