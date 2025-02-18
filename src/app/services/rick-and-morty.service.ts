import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RickAndMortyService {
  private API_URL = 'https://rickandmortyapi.com/api/character';

  constructor(private http: HttpClient) {}

  getAllCharacters(page: number = 1): Observable<any> {
    return this.http.get<any>(`${this.API_URL}?page=${page}`);
  }


  getCharacterById(id: number): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/${id}`);
  }

  getCharactersByName(name: string, page: number = 1): Observable<any> {
    return this.http.get<any>(`${this.API_URL}?name=${name}&page=${page}`);
  }

}
