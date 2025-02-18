import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { tap } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  credentials = { email: '', password: '' };

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    console.log("Datos del formulario antes de enviar:", this.credentials);

    this.authService.login(this.credentials).pipe(
      tap(response => {
        this.authService.saveToken(response.token);
        console.log("✅ Login exitoso:", response);
        this.router.navigate(['/']);
      })
    ).subscribe({
      error: error => {
        console.error("🔴 Error en login:", error);
      }
    });
  }
}
