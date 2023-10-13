import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CanastaService } from './../../services/canasta/canasta.service';
import { CiudadService } from './../../services/ciudad/ciudad.service';
import { ToastrService } from 'ngx-toastr';
import { VerifyToken } from './../../services/verify-token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-canasta',
  templateUrl: './canasta.component.html',
  styleUrls: [ './canasta.component.css' ]
})

export class CanastaComponent implements OnInit {
  form: FormGroup;
  FamilyBasket: any;
  Citys: any;
  TituloAccion = 'Agregar';
  adm_cedula!: string;
  cta_codigo!: string;
  fk_cta_adm_cedula!: string;
  ciu_codigo!: string;
  ciu_nombre!: string;
  rol!: string;
  constructor(
    private fb: FormBuilder,
    private FamilyBasketService: CanastaService,
    private CityService: CiudadService,
    private toastr: ToastrService,
    private verifyToken: VerifyToken,
  ) {
    //restriccion del formulario
    this.form = this.fb.group({
      cta_nombre: [ "", Validators.required ],
      cta_precio: [ "", Validators.required ],
      cta_ciudad: [ "", Validators.required ],
    })
  }

  ngOnInit(): void {
    this.listCity();
    this.getFamilyBasket();
    //verificar rol
    this.rol = this.verifyToken.obtenerRol();
  }
  getFamilyBasket() {
    //Listar precios
    this.FamilyBasketService.getFamilyBasket().subscribe(respuesta => {
      this.FamilyBasket = respuesta;
    });
  }
  listCity() {
    this.CityService.getCity().subscribe(respuesta => {
      this.Citys = respuesta;
    });
  }
  //capturar el id de la ciudad
  onCitySelect(event: Event) {
    const selectedCityName = (event.target as HTMLSelectElement).value;

    const selectedCity = this.Citys.find((city: { ciu_nombre: string; }) => city.ciu_nombre === selectedCityName);

    if (selectedCity) {
      this.ciu_codigo = selectedCity.ciu_codigo;
    }
  }

  addFamilyBasket() {
    //formatear la fecha
    const fechaActualUtc: Date = new Date();
    const fechaFormateada: string = fechaActualUtc.toISOString().split('T')[ 0 ];
    this.adm_cedula = this.verifyToken.obtenerCedulaUsuario();
    const familyBaskets: any = {
      cta_codigo: this.cta_codigo,
      cta_nombre: this.form.get('cta_nombre')?.value,
      cta_precio: this.form.get('cta_precio')?.value,
      cta_fecha: fechaFormateada,
      cta_ciudad: this.form.get('cta_ciudad')?.value,
      fk_cta_adm_cedula: this.adm_cedula,
      fk_cta_ciu_codigo: this.ciu_codigo,
    }
    if (this.cta_codigo === undefined) {
      familyBaskets.cta_codigo == undefined;
      this.FamilyBasketService.addFamilyBasket(familyBaskets).subscribe(respuesta => {
        this.ngOnInit();
        this.form.reset();
        this.toastr.success('Se agrego el precio correctamente', 'Mensaje', {
          positionClass: 'toast-top-center',
          closeButton: true,
          timeOut: 5000,
          progressBar: true
        });
      });
    } else {
      this.FamilyBasketService.editFamilyBasket(this.cta_codigo, familyBaskets).subscribe(respuesta => {
        this.ngOnInit();
        this.form.reset();
        this.toastr.success('Se edito el precio correctamente', 'Mensaje', {
          positionClass: 'toast-top-center',
          closeButton: true,
          timeOut: 5000,
          progressBar: true
        });
      });
    }
  }
  selectFamilyBasket(FamilyBasket: any) {
    this.TituloAccion = 'Editar';
    this.cta_codigo = FamilyBasket.cta_codigo;
    this.form.patchValue({
      cta_codigo: this.cta_codigo,
      cta_nombre: FamilyBasket.cta_nombre,
      cta_precio: FamilyBasket.cta_precio,
    })
  }
  deleteFamilyBasket(cta_codigo: any, iControl: any) {
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
        this.FamilyBasketService.deleteFamilyBasket(cta_codigo).subscribe((respuesta) => {
          this.FamilyBasket.splice(iControl, 1);
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
