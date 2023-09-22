import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { CiudadService } from './../../services/ciudad/ciudad.service';
import { ToastrService } from 'ngx-toastr';
import { VerifyToken } from './../../services/verify-token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ciudad',
  templateUrl: './ciudad.component.html',
  styleUrls: ['./ciudad.component.css']
})
export class CiudadComponent implements OnInit {
  form: FormGroup;
  Citys: any;
  TituloAccion = 'Agregar';
  ciu_codigo!: string;
  rol!: string;
  constructor(
    private fb: FormBuilder,
    private CityService: CiudadService,
    private toastr: ToastrService,
    private verifyToken: VerifyToken,
  ) {
    //restricciones del formulario
    this.form = this.fb.group({
      ciu_nombre: ['', Validators.required],
      ciu_departamento: ['', Validators.required],
      ciu_cod_postal: ['', Validators.required],
    })

  }

  ngOnInit(): void {
    this.listCity();
  }
  //Listar ciudades
  listCity() {
    this.CityService.getCity().subscribe(respuesta => {
      this.Citys = respuesta;
    })
  }
  //Agregar ciudad
  addCity() {
    const citys: any = {
      ciu_codigo: this.ciu_codigo,
      ciu_nombre: this.form.get('ciu_nombre')?.value,
      ciu_departamento: this.form.get('ciu_departamento')?.value,
      ciu_cod_postal: this.form.get('ciu_cod_postal')?.value.toString(),
    }
    //crear ciudad
    if (this.TituloAccion=='Agregar') {
      this.CityService.addCity(citys).subscribe(respuesta => {
        this.ngOnInit();
        this.form.reset();
        this.toastr.success('Se agrego la ciudad correctamente', 'Mensaje', {
          positionClass: 'toast-top-center',
          closeButton: true,
          timeOut: 5000,
          progressBar: true
        });
      });
    } else {
      this.CityService.editCity(this.ciu_codigo, citys).subscribe(respuesta => {
        this.TituloAccion = 'agregar';
        this.form.reset();
        this.ngOnInit();
        this.toastr.success('Se edito la ciudad correctamente', 'Mensaje', {
          positionClass: 'toast-top-center',
          closeButton: true,
          timeOut: 5000,
          progressBar: true
        });
      })
    }

  }
  //Obtener datos de la ciudad a editar
  selectCity(city: any) {
    this.TituloAccion = 'Editar';
    this.ciu_codigo = city.ciu_codigo;
    this.form.patchValue({
      ciu_nombre: city.ciu_nombre,
      ciu_departamento: city.ciu_departamento,
      ciu_cod_postal: city.ciu_cod_postal,
    });
    this.toastr.info('Se cargaron los datos correctamente', 'Mensaje', {
      positionClass: 'toast-top-center',
      closeButton: true,
      timeOut: 5000,
      progressBar: true
    });
  }
  //Eliminar ciudad
  deleteCity(ciu_codigo: any, iControl: any) {
    Swal.fire({
      title: '¿Estas seguro que deseas eliminar el registro?',
      text: "Si eliminas el registro no podras recuperarlo",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Lo quiero eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.CityService.deleteCity(ciu_codigo).subscribe((respuesta) => {
          this.Citys.splice(iControl, 1);
          this.toastr.error('Se elimino el registro correctamente', 'Mensaje', {
            positionClass: 'toast-top-center',
            closeButton: true,
            timeOut: 5000,
            progressBar: true
          });
        })
        Swal.fire(
          'Eliminado!',
          'Tu registro ha sido borrado exitosamente!',
          'success'
        )
      }
    });//fin Swal
  }

}
