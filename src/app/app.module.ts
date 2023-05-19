import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './components/auth/auth.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MenubarComponent } from './components/menubar/menubar.component';
import { AdministradorComponent } from './components/administrador/administrador.component';
import { ConsultorComponent } from './components/consultor/consultor.component';
import { GranjeroComponent } from './components/granjero/granjero.component';
import { ProductosComponent } from './components/productos/productos.component';
import { ServiciosComponent } from './components/servicios/servicios.component';
import { AgricolaComponent } from './components/agricola/agricola.component';
import { PecuarioComponent } from './components/pecuario/pecuario.component';
import { CanastaComponent } from './components/canasta/canasta.component';
import { FincaComponent } from './components/finca/finca.component';
import { EmpresaComponent } from './components/empresa/empresa.component';
import { EmpleoComponent } from './components/empleo/empleo.component';
import { CiudadComponent } from './components/ciudad/ciudad.component';
import { ConsultaComponent } from './components/consulta/consulta.component';
import { NoticiasComponent } from './components/noticias/noticias.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './components/auth/register/register.component';
import { RecoverPasswordComponent } from './components/auth/recover-password/recover-password.component';
import { MaterialModule } from './modules/material.module';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { TokenInterceptorService } from './services/token-interceptor.service';


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    NavbarComponent,
    MenubarComponent,
    AdministradorComponent,
    ConsultorComponent,
    GranjeroComponent,
    ProductosComponent,
    ServiciosComponent,
    AgricolaComponent,
    PecuarioComponent,
    CanastaComponent,
    FincaComponent,
    EmpresaComponent,
    EmpleoComponent,
    CiudadComponent,
    ConsultaComponent,
    NoticiasComponent,
    LandingPageComponent,
    RegisterComponent,
    RecoverPasswordComponent,
    PageNotFoundComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    //Jwt
    {provide: JWT_OPTIONS, useValue: JWT_OPTIONS},
    JwtHelperService,
    //Token interceptor
    {provide: HTTP_INTERCEPTORS, useClass:TokenInterceptorService, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
