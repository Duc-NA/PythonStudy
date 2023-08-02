import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './feature/home/home.component';
import { UserComponent } from './feature/user/user.component';
import { RoleComponent } from './feature/role/role.component';
import { RegisterComponent } from './feature/register/register.component';
import { LoginComponent } from './feature/login/login.component';
const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "user",    
    component: UserComponent
  },
  {
    path: "login",    
    component: LoginComponent
  },
  {
    path: "register",    
    component: RegisterComponent
  },
  {
    path: "role",    
    component: RoleComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
