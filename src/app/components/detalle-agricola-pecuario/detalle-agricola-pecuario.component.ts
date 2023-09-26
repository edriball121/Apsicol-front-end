import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalle-agricola-pecuario',
  templateUrl: './detalle-agricola-pecuario.component.html',
  styleUrls: [ './detalle-agricola-pecuario.component.css' ]
})
export class DetalleAgricolaPecuarioComponent {
  detallesAgricolaPecuario: any;
  constructor(
    private route: ActivatedRoute,
  ) {
    const state = window.history.state;
    this.detallesAgricolaPecuario = state.detalles;
  }
}
