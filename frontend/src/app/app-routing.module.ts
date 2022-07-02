import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AddPlaceComponent } from './components/add-place/add-place.component';
import { RoleGuardService } from './services/role-guard.service';
import { PlaceComponent } from './components/place/place.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {
    path: 'addPlace',
    component: AddPlaceComponent,
    canActivate: [RoleGuardService],
    data: {roles: ['admin', 'user']}
  },
  {path: ':id', component: PlaceComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
