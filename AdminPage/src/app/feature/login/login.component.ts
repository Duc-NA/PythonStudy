import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/core/services/auth.service';
import { StorageService } from '@app/core/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(
    // private authService: AuthService,
    private storageService: StorageService
  ) { }

  ngOnInit(): void {
  }
}