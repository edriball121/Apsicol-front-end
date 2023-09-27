import { Component, OnInit } from '@angular/core';
import { VerifyToken } from './../../services/verify-token.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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
  cerrarSesion(): void {
    Swal.fire({
      title: 'Alerta!',
      text: "¿Estas seguro que deseas cerrar sesión?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No, Regresar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.verifyToken.destruirToken();
        this.router.navigate([ 'landingPage' ]);
        Swal.fire({
          title: 'Alerta!',
          text: 'Tu sesión ha sido cerrada con éxito!',
          icon: 'success',
          timer: 1000,
          timerProgressBar: true
        })
      }
    });//fin Swal
  }
}
