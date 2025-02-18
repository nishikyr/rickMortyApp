import { Component, OnInit, computed } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './favorites.component.html',
})
export class FavoritesComponent implements OnInit {
  user = computed(() => this.authService.userSignal());

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.loadUserProfile();
  }

  removeFromFavorites(characterId: string) {
    console.log("********* Eliminando de favoritos:", characterId);
    this.authService.removeFromFavorites(characterId);
  }
}
