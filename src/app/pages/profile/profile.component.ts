import { Component, computed } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
})
export class ProfileComponent {
  user = computed(() => this.authService.userSignal());
  selectedFile: File | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0]; // ✅ Guardamos la imagen seleccionada
  }

  updateProfile() {
    console.log("📤 Datos antes de enviar:", this.user());

    // Si se seleccionó una imagen, subirla
    if (this.selectedFile) {
      this.authService.uploadAvatar(this.selectedFile);
    }

    // Actualizar el nombre del usuario (sin perder el avatar si no se cambia)
    this.authService.updateProfile({
      name: this.user().name,
      avatar: this.user().avatar 
    });
  }
}
