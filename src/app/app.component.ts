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
    this.verifyToken.estaLogueado$.subscribe((estaLogueado) => {
      this.estaLogueado = estaLogueado;
    });
    this.verifyToken.validarToken();
  }
}
