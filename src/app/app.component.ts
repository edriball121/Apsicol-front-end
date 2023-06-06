import { Component, OnInit } from '@angular/core';
import { VerifyToken } from './services/verify-token.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ],
})
export class AppComponent implements OnInit {
  title = 'apsicolFrontEnd';
  estaLogueado!: boolean;
  constructor(private verifyToken: VerifyToken) { }
  ngOnInit() {
    //verificar el estado del loguin para que aplique los cambios
    this.verifyToken.estaLogueado$.subscribe((estaLogueado) => {
      this.estaLogueado = estaLogueado;
    });
    this.verifyToken.validarToken();

    //Evento que elimina el token si se cierra el navegador
    window.addEventListener('beforeunload', () => {
      // Eliminar el token del localStorage
      localStorage.removeItem('token');
    });
  }
}
