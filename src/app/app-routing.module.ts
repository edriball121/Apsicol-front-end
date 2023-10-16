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
import { GranjeroComponent } from './components/granjero/granjero.component';
import { NoticiasComponent } from './components/noticias/noticias.component';
import { DecisionTreeComponent } from './components/decision-tree/decision-tree.component';
import { ConsultorComponent } from './components/consultor/consultor.component';
import { CiudadComponent } from './components/ciudad/ciudad.component';
import { AgricolaComponent } from './components/agricola/agricola.component';
import { DetalleAgricolaPecuarioComponent } from './components/detalle-agricola-pecuario/detalle-agricola-pecuario.component';
import { PecuarioComponent } from './components/pecuario/pecuario.component';
import { CanastaComponent } from './components/canasta/canasta.component';
import { EmpresaComponent } from './components/empresa/empresa.component';
import { EmpleoComponent } from './components/empleo/empleo.component';
import { FincaComponent } from './components/finca/finca.component';
import { ProductosComponent } from './components/productos/productos.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'landingPage' },
  { path: 'landingPage', component: LandingPageComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'recoverPassword', component: RecoverPasswordComponent },
  { path: 'decision-tree', component: DecisionTreeComponent },
  { path: 'admin', component: AdministradorComponent, data: { expectedRole: 'admin' }, canActivate: [RoleGuard, AuthGuard] },
  { path: 'consult', component: ConsultaComponent, data: { expectedRole: ['consultant', 'admin', 'farmer'] }, canActivate: [RoleGuard, AuthGuard] },
  { path: 'farmer', component: GranjeroComponent, data: { expectedRole: 'admin' }, canActivate: [RoleGuard, AuthGuard] },
  { path: 'news', component: NoticiasComponent, data: { expectedRole: 'admin' }, canActivate: [RoleGuard, AuthGuard] },
  { path: 'consultant', component: ConsultorComponent, data: { expectedRole: ['consultant', 'admin'] }, canActivate: [RoleGuard, AuthGuard] },
  { path: 'city', component: CiudadComponent, data: { expectedRole: ['consultant', 'admin', 'farmer'] }, canActivate: [RoleGuard, AuthGuard] },
  { path: 'farming', component: AgricolaComponent, data: { expectedRole: ['consultant', 'admin', 'farmer'] }, canActivate: [RoleGuard, AuthGuard] },
  { path: 'farming/:id', component: DetalleAgricolaPecuarioComponent, data: { expectedRole: ['consultant', 'admin', 'farmer'] }, canActivate: [RoleGuard, AuthGuard] },
  { path: 'livestock', component: PecuarioComponent, data: { expectedRole: ['consultant', 'admin', 'farmer'] }, canActivate: [RoleGuard, AuthGuard] },
  { path: 'livestock/:id', component: DetalleAgricolaPecuarioComponent, data: { expectedRole: ['consultant', 'admin', 'farmer'] }, canActivate: [RoleGuard, AuthGuard] },
  { path: 'familyBasket', component: CanastaComponent, data: { expectedRole: ['consultant', 'admin', 'farmer'] }, canActivate: [RoleGuard, AuthGuard] },
  { path: 'company', component: EmpresaComponent, data: { expectedRole: ['admin', 'farmer'] }, canActivate: [RoleGuard, AuthGuard] },
  { path: 'job', component: EmpleoComponent, data: { expectedRole: ['admin', 'farmer'] }, canActivate: [RoleGuard, AuthGuard] },
  { path: 'farm', component: FincaComponent, data: { expectedRole: ['admin', 'farmer'] }, canActivate: [RoleGuard, AuthGuard] },
  { path: 'product', component: ProductosComponent, data: { expectedRole: ['admin', 'farmer'] }, canActivate: [RoleGuard, AuthGuard] },
  //Not Found
  { path: '**', pathMatch: 'full', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
