// module import 
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

// component
import { AppComponent } from './app.component';
import { HomeComponent } from './feature/home/home.component';
import { LoginComponent } from './feature/login/login.component';
import { RegisterComponent } from './feature/register/register.component';
import { UserComponent } from './feature/user/user.component';
import { RoleComponent } from './feature/role/role.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { ErrorComponent } from './shared/alert/error/error.component';
import { SuccessComponent } from './shared/alert/success/success.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,    
    RegisterComponent,
    UserComponent,
    FooterComponent,
    HeaderComponent,
    RoleComponent,
    ErrorComponent,    
    SuccessComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
