import { Component, OnInit } from '@angular/core';
import { AdministradorService } from './../../services/administrador/administrador.service';
import { JwtHelperService } from '@auth0/angular-jwt';
@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css']
})
export class AdministradorComponent implements OnInit {
  constructor(
    private AdminService: AdministradorService,
  ) { }

  ngOnInit(): void {
  }
  token() {
    const token = localStorage.getItem('token');
    const decodedToken = this.decodeToken(token!);
    const rol = decodedToken.rol;
    console.log(rol);
    return rol;
  }
  private decodeToken(token: string): any {
    const jwtHelper = new JwtHelperService();
    return jwtHelper.decodeToken(token);
  }


}
