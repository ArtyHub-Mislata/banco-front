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
    username: '',
    password: '',
  };

  isLogged: boolean = false;

  generalError: string = '';

  loading: boolean = false;

  constructor(
    private httpService: HttpService,
    private router: Router,
  ) {}

  onLogin(loginForm: NgForm) {
    this.generalError = '';

    if (loginForm.invalid) return;

    this.loading = true;

    this.httpService.login(this.credential).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/app']);
      },
      error: () => {
        this.loading = false;
        this.generalError = 'Error al iniciar sesión';
      },
    });
  }
}
