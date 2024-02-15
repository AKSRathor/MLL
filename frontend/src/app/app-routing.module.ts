import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ApiHomeComponent } from './components/api-home/api-home.component';

const routes: Routes = [
  {
    path:"home",
    component:ApiHomeComponent
  },
  {
    path:"login",
    component:LoginComponent
  },
  {
    path:'', redirectTo:"home", pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
