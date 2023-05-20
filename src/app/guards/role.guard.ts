import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AdministradorService } from '../services/administrador/administrador.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(
    private AdminService: AdministradorService,
    private route: Router,
  ) {

  }
  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data[ 'expectedRole' ];
    const token = localStorage.getItem('token');
    const decodedToken = this.decodeToken(token!);
    const adm_rol = decodedToken.adm_rol; // Accede a la propiedad adm_rol del objeto decodificado

    if(!this.AdminService.isLogin() || adm_rol !== expectedRole){
      console.log('Usuario no autorizado para la vista');
      this.route.navigate(['auth']);
      return false;
    }

    return true;
  }

  private decodeToken(token: string): any {
    const jwtHelper = new JwtHelperService();
    return jwtHelper.decodeToken(token);
  }

}
