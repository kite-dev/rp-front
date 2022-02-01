import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent, // this is the component with the <router-outlet> in the template
  },
  {
    path: 'register',
    component: RegisterComponent, // this is the component with the <router-outlet> in the template
  },
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
   // { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
