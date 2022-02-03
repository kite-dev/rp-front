import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssociateComponent } from './components/home/associate/associate.component';
import { HistoryComponent } from './components/home/history/history.component';
import { HomeComponent } from './components/home/home.component';
import { TransferComponent } from './components/home/transfer/transfer.component';
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
  {
    path: 'home',
    component: HomeComponent, // this is the component with the <router-outlet> in the template
  },
  {
    path: 'transfer',
    component: TransferComponent, // this is the component with the <router-outlet> in the template
  },
  {
    path: 'history',
    component: HistoryComponent, // this is the component with the <router-outlet> in the template
  },
  {
    path: 'associate',
    component: AssociateComponent, // this is the component with the <router-outlet> in the template
  },
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
   // { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
