import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { GranjeroService } from './../../../services/granjero/granjero.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: [ './recover-password.component.css' ]
})

export class RecoverPasswordComponent implements OnInit {
  //traer el formulario de login
  form: FormGroup;
  constructor(
    public formulario: FormBuilder,
    private FarmerService: GranjeroService,
    private router: Router,
  ) {
    this.form = this.formulario.group({
      document: [ '' ],
      email: [ '' ],
    });
  }

  ngOnInit(): void {
  }

  recoverPw() {
    const document = this.form.get('document')?.value.toString();
    const email = this.form.get('email')?.value;

    if (document != '' && email != '') {
      this.FarmerService.recoverPasswordFarmer(document, email).subscribe((respuesta) =>{
        Swal.fire(
          'Solicitud!',
          'Tu contraseña se ha restablecido de manera exitosa!',
          'success'
        );
        this.router.navigate(['landingPage']);
      },(error)=>{
        Swal.fire(
          'Solicitud!',
          'Usuario o email inconrrectos, intentelo de nuevo!',
          'warning'
        );
        this.form.reset()
      }
      );
    }
  }
}
