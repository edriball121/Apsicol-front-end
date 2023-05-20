import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup } from '@angular/forms'
import { FormBuilder } from '@angular/forms'
import { Router } from '@angular/router';
import { AdministradorService } from './../../services/administrador/administrador.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: [ './auth.component.css' ]
})
export class AuthComponent implements OnInit {
  //traer el formulario de login
  formLogin: FormGroup;

  constructor(
    public formulario: FormBuilder,
    private router: Router,
    private AdminService: AdministradorService,
  ) {
    this.formLogin = this.formulario.group({
      document: [ '' ],
      password: [ '' ],
      typeUser: [ 'Seleccionar...' ]
    });
  }

  ngOnInit(): void { }

  login() {
    const document = this.formLogin.get('document')?.value;
    const password = this.formLogin.get('password')?.value;
    const typeUser = this.formLogin.get('typeUser')?.value;
    console.log(typeUser);
    if (document != '' && password !== '') {
      if (typeUser === 'admin') {
        this.AdminService.getLoginAdmin(document, password).subscribe((res: any) => {
          localStorage.setItem('token', res.token);
          this.router.navigate([ 'admin' ]);
        });
      }
      if (typeUser === 'consultant') {
        console.log('El login para consultor, aun esta en construccion');
      }
      if (typeUser === 'farmer') {
        console.log('El login para granjero, aun esta en construccion');
      }
    } else {
      console.log('Debe diligenciar todos los datos del formulario');
    }
  }
}
