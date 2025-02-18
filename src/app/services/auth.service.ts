import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_URL = 'http://localhost:3000/api/auth';
  userSignal = signal<any>(null);

  constructor(private http: HttpClient) {
    this.loadUserFromToken();
  }

  register(user: any): Observable<any> {
    return this.http.post(`${this.API_URL}/register`, user);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.API_URL}/login`, credentials).pipe(
      tap((response: any) => {
        this.saveToken(response.token);
        this.loadUserProfile();
      })
    );
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
    this.loadUserProfile();
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  loadUserFromToken() {
    const token = this.getToken();
    if (token) {
      this.loadUserProfile();
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.userSignal.set(null); //  Notifica que el usuario cerró sesión
  }

  getUserProfile(): Observable<any> {
    return this.http.get(`${this.API_URL}/profile`, {
      headers: { Authorization: `Bearer ${this.getToken()}` }
    });
  }

  updateProfile(user: any): Observable<any> {
    return this.http.put(`${this.API_URL}/profile`, user, {
      headers: { Authorization: `Bearer ${this.getToken()}` }
    }).pipe(
      tap(updatedUser => {
        this.userSignal.set(updatedUser); // 👈 Actualiza el usuario en tiempo real
        console.log("✅ Usuario actualizado en el Signal:", updatedUser);
      })
    );
  }


  loadUserProfile() {
    if (this.getToken()) {
      this.getUserProfile().pipe(
        tap((user) => this.userSignal.set(user)) // Actualiza el usuario en tiempo real
      ).subscribe({
        error: () => this.logout()
      });
    }
  }

  isLogged(): boolean {
    return !!this.getToken();
  }

  addToFavorites(character: any) {
    this.http.post(`${this.API_URL}/favorites`, character, {
      headers: { Authorization: `Bearer ${this.getToken()}` }
    }).pipe(
      tap((favorites) => {
        this.userSignal.update(user => ({
          ...user,
          favorites
        }));
      })
    ).subscribe();
  }


  getFavorites(): Observable<any> {
    return this.http.get(`${this.API_URL}/favorites`, {
      headers: { Authorization: `Bearer ${this.getToken()}` }
    });
  }

  removeFromFavorites(characterId: string) {
    this.http.delete(`${this.API_URL}/favorites/${characterId}`, {
      headers: { Authorization: `Bearer ${this.getToken()}` }
    }).pipe(
      tap((favorites) => {
        this.userSignal.update(user => ({
          ...user,
          favorites
        }));
      })
    ).subscribe();
  }

  uploadAvatar(file: File) {
    const formData = new FormData();
    formData.append('avatar', file);

    this.http.put<{ avatar: string }>(`${this.API_URL}/profile/avatar`, formData, {
      headers: { Authorization: `Bearer ${this.getToken()}` }
    }).pipe(
      tap(response => {
        this.userSignal.update(user => ({
          ...user,
          avatar: response.avatar
        }));
      })
    ).subscribe();
  }


}
