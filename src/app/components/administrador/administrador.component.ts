import { Component, OnInit } from '@angular/core';
import { AdministradorService } from './../../services/administrador/administrador.service';
import { JwtHelperService } from '@auth0/angular-jwt';
@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: [ './administrador.component.css' ]
})
export class AdministradorComponent implements OnInit {
  constructor(
    private AdminService: AdministradorService,
  ) { }

  ngOnInit(): void {
    //console.log(this.token());
  }
  /*token() {
    const token = localStorage.getItem('token');
    const decodedToken = this.decodeToken(token!);
    const adm_rol = decodedToken.adm_rol;
    return adm_rol;
  }
  private decodeToken(token: string): any {
    const jwtHelper = new JwtHelperService();
    return jwtHelper.decodeToken(token);
  }*/


}
