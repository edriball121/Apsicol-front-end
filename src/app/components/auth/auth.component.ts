import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup } from '@angular/forms'
import { FormBuilder } from '@angular/forms'
import { Router } from '@angular/router';
import { AdministradorService } from './../../services/administrador/administrador.service';
import { GranjeroService } from './../../services/granjero/granjero.service';
import { ConsultorService } from './../../services/consultor/consultor.service';
import { VerifyToken} from './../../services/verify-token.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  //traer el formulario de login
  formLogin: FormGroup;

  constructor(
    public formulario: FormBuilder,
    private router: Router,
    private AdminService: AdministradorService,
    private FarmerService: GranjeroService,
    private ConsultantService: ConsultorService,
    private verifyToken: VerifyToken
  ) {
    this.formLogin = this.formulario.group({
      document: [''],
      password: [''],
      typeUser: ['Seleccionar...']
    });
  }

  ngOnInit(): void { }

  login() {
    const document = this.formLogin.get('document')?.value;
    const password = this.formLogin.get('password')?.value;
    const typeUser = this.formLogin.get('typeUser')?.value;
    if (document != '' && password !== '') {
      if (typeUser === 'admin') {
        this.AdminService.getLoginAdmin(document, password).subscribe((res: any) => {
          localStorage.setItem('token', res.token);
          this.verifyToken.validarToken();
          this.router.navigate(['admin']);
        });
      }
      if (typeUser === 'consultant') {
        this.ConsultantService.getLoginConsultant(document, password).subscribe((res: any) => {
          localStorage.setItem('token', res.token);
          this.verifyToken.validarToken();
          this.router.navigate(['consult']);
        });
      }
      if (typeUser === 'farmer') {
        this.FarmerService.getLoginFarmer(document, password).subscribe((res: any) => {
          localStorage.setItem('token', res.token);
          this.verifyToken.validarToken();
          this.router.navigate(['landingPage']);
        });
      }
    } else {
      console.log('Debe diligenciar todos los datos del formulario');
    }
  }
}
