import { Component, computed } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  user = computed(() => this.authService.userSignal());

  constructor(private authService: AuthService, private router: Router) {
  }

  goToLogin() {
    console.log("🔵 Redirigiendo a /login");
    this.router.navigate(['/login']);
  }


  loadUser() {
    const token = this.authService.getToken();
    if (token) {
      this.authService.getUserProfile().pipe(
        tap((data) => {
          this.user = data;
          console.log("✅ Usuario cargado:", this.user);
        })
      ).subscribe({
        error: (error) => {
          console.error("🔴 Error obteniendo el usuario:", error);
          this.authService.logout();
        }
      });
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }


}
