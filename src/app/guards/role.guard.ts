import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AdministradorService } from '../services/administrador/administrador.service';
import { GranjeroService } from '../services/granjero/granjero.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(
    private AdminService: AdministradorService,
    private FarmerService: GranjeroService,
    private route: Router,
  ) {

  }
  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data['expectedRole'] as string[];
    const token = localStorage.getItem('token');
    const decodedToken = this.decodeToken(token!);
    console.log(decodedToken);
    const rol = decodedToken.rol;

    if (!this.AdminService.isLogin() || !expectedRole || expectedRole.length === 0 || !expectedRole.includes(rol)) {
      console.log('Usuario no autorizado para la vista');
      this.route.navigate(['landingPage']);
      return false;
    }
    return true;
  }

  private decodeToken(token: string): any {
    const jwtHelper = new JwtHelperService();
    return jwtHelper.decodeToken(token);
  }

}
