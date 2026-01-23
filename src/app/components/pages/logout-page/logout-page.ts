import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HttpService } from '../../../services/http-service';

@Component({
  selector: 'logout-page',
  imports: [RouterLink],
  templateUrl: './logout-page.html',
  styleUrl: './logout-page.scss',
})
export class LogoutPage {
  constructor(
    private router: Router,
    private httpService: HttpService,
  ) {}

  logOut() {
    this.httpService.logout().subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.log('HAY UN ERROR EN EL LOGOUT', err);
      },
    });
  }
}
