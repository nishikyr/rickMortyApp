import { Component, OnInit } from '@angular/core';
import { RickAndMortyService } from '../../services/rick-and-morty.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { computed } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  characters: any[] = [];
  currentPage = 1;
  totalPages = 40;
  searchQuery = '';

  user = computed(() => this.authService.userSignal());

  constructor(
    private rickAndMortyService: RickAndMortyService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadCharacters();
  }

  loadCharacters() {
    this.rickAndMortyService.getAllCharacters(this.currentPage).subscribe(response => {
      this.characters = response.results;
      this.totalPages = response.info.pages;
    });
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadCharacters();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadCharacters();
    }
  }

  searchCharacters() {
    if (this.searchQuery.trim().length > 0) {
      this.rickAndMortyService.getCharactersByName(this.searchQuery, this.currentPage).subscribe(response => {
        this.characters = response.results;
        this.totalPages = response.info.pages;
      });
    } else {
      this.loadCharacters();
    }
  }

  // 👉 Métodos para manejar favoritos
  addToFavorites(character: any) {
    console.log("!!!! AGREGANDOOOOOO: ", character);

    this.authService.addToFavorites({
      characterId: character.id,
      name: character.name,
      image: character.image,
      status: character.status,
      species: character.species
      
    });
  }


  removeFromFavorites(characterId: string) {
    console.log("**********!!!!!!!! Eliminando de favoritos:", characterId);
    this.authService.removeFromFavorites(characterId);
  }


  isFavorite(character: any): boolean {
    return this.user()?.favorites?.some((fav: { characterId: string }) => fav.characterId === character.id) ?? false;
  }

}
