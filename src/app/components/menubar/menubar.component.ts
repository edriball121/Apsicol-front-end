import { Component, OnInit } from '@angular/core';
import { VerifyToken } from './../../services/verify-token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: [ './menubar.component.css' ]
})
export class MenubarComponent implements OnInit {
  estaLogueado!: boolean
  mostrarMenu: boolean = false;
  constructor(
    private verifyToken: VerifyToken,
    private router: Router
  ) { }
  ngOnInit() {
    this.verifyToken.estaLogueado$.subscribe((estaLogueado) => {
      this.estaLogueado = estaLogueado;
    });
    this.verifyToken.validarToken();
    this.getRol();
  }
  getRol(): void {
    const rol = this.verifyToken.obtenerRol();
    this.mostrarMenu = rol === 'admin';
    console.log('Rol:', rol);
  }
  cerrarSesion(): void {
    this.verifyToken.destruirToken();
    this.router.navigate([ 'landingPage' ]);
  }
}
