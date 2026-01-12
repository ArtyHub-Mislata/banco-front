import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../services/http-service';
import { map } from 'rxjs';

export const LoginGuardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const httpService = inject(HttpService)

  return httpService.isLogged().pipe(
    map(customer => {
      if (customer) {
        console.log(customer)
        return true;
      }
      alert("Necesitas iniciar sesión para acceder a esta página");
      router.navigate(['/login']);
      return false;
    })
  );
};
