import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLogged()) {
    return true; // Si el usuario esta autenticado
  } else {

    console.warn("!!!!!!!!Acceso denegado. Redirigiendo al login...");
    return router.navigate(['/login']);
  }
};
