import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RickAndMortyService } from '../../services/rick-and-morty.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-character-detail',
  standalone: true,
  imports: [CommonModule, RouterModule], // 👈 Importa RouterModule aquí
  templateUrl: './character-detail.component.html',
})
export class CharacterDetailComponent implements OnInit {
  character: any;

  constructor(
    private route: ActivatedRoute,
    private rickAndMortyService: RickAndMortyService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.rickAndMortyService.getCharacterById(Number(id)).subscribe(response => {
      this.character = response;
    });
  }
}
