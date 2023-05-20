import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AdministradorService } from '../services/administrador/administrador.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private AdminService: AdministradorService,
    private router: Router,
  ){

  }
  canActivate():boolean{
    if(!this.AdminService.isLogin()){
      console.log('El tocken no es valido o expiró');
      this.router.navigate(['auth']);
      return false;
    }
    return true;
  }
}
