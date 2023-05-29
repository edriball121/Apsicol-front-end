import { Component, OnInit } from '@angular/core';
import { VerifyToken } from './../../services/verify-token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: [ './navbar.component.css' ]
})
export class NavbarComponent implements OnInit {
  estaLogueado!: boolean;
  TituloAccion = '';
  tokenValidado = false;

  constructor(private verifyToken: VerifyToken, private router: Router) { }

  ngOnInit(): void {
    this.verifyToken.estaLogueado$.subscribe((estaLogueado) => {
      this.estaLogueado = estaLogueado;
      if (estaLogueado && !this.tokenValidado) {
        this.TituloAccion = this.verifyToken.obtenerNombreUsuario();
        this.tokenValidado = true;
      }
    });

    this.verifyToken.validarToken();
    this.getRol();
  }

  getRol(): void {
    const rol = this.verifyToken.obtenerRol();
  }


}
