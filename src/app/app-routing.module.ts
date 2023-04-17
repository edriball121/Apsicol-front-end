import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//agregar rutas de los componentes
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { AuthComponent } from './components/auth/auth.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { RecoverPasswordComponent } from './components/auth/recover-password/recover-password.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'landingPage' },
  { path: 'landingPage', component: LandingPageComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'recoverPassword', component: RecoverPasswordComponent },
  //Not Found
  { path: '**', pathMatch: 'full', component: PageNotFoundComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
