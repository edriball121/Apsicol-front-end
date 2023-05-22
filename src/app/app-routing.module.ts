import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//agregar rutas de los componentes
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { AuthComponent } from './components/auth/auth.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { RecoverPasswordComponent } from './components/auth/recover-password/recover-password.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AdministradorComponent } from './components/administrador/administrador.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { ConsultaComponent } from './components/consulta/consulta.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'landingPage' },
  { path: 'landingPage', component: LandingPageComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'recoverPassword', component: RecoverPasswordComponent },
  { path: 'admin', component: AdministradorComponent, data: { expectedRole: 'admin' }, canActivate: [RoleGuard, AuthGuard] },
  { path: 'consult', component: ConsultaComponent, data: { expectedRole: ['consultant', 'admin'] }, canActivate: [RoleGuard, AuthGuard] },
  //Not Found
  { path: '**', pathMatch: 'full', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
