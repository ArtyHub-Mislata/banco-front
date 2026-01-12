import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CButton } from '../../ui/c-button/c-button';
import { CredentialModel } from '../../../models/CredentialModel';
import { HttpService } from '../../../services/http-service';

@Component({
  selector: 'login-page',
  imports: [FormsModule, CButton, RouterLink],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPage {
  credential: CredentialModel = {
    login: '',
    password: '',
  };

  isLogged: boolean = false;

  generalError: string = '';

  constructor(private httpService: HttpService, private router: Router) { }

  onLogin(loginForm: NgForm) {

    this.generalError = '';

    if(loginForm.invalid) return;

    this.httpService.login(this.credential).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: () => {
        this.generalError = 'Error al iniciar sesión';
      },
    });
  }
}
