import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { JwtResponse, User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiURL = 'http://localhost:8000/api';
  private tokenKey = 'token';
  user: any;

  constructor(private http: HttpClient, private router: Router) {}

  getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  register(user: User): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(`${this.apiURL}/register`, user).pipe(
      tap(res => this.storeToken(res.token))
    );
  }

  login(user: User): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(`${this.apiURL}/login`, user).pipe(
      tap(res => {
        this.storeToken(res.token);
        this.getUser(); // Verifica si es admin y redirige
      })
    );
  }

  logout(): void {
    const token = this.getToken();
    if (!token) return;

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.post(`${this.apiURL}/logout`, {}, { headers }).subscribe({
      next: () => {
        this.removeToken();
        this.router.navigate(['/login']);
      },
      error: err => {
        console.error('Error al cerrar sesión', err);
        this.removeToken(); // Limpiar aunque falle
        this.router.navigate(['/login']);
      }
    });
  }

  private storeToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getUser(): Observable<any> {
  return this.http.get(`${this.apiURL}/user`, {
    headers: this.getAuthHeaders()
  });
}

  getCurrentUserId(): number | null {
  const id = localStorage.getItem('user_id');
  return id ? parseInt(id, 10) : null;
}

isLoggedIn(): boolean {
  return !!localStorage.getItem('token');
}




}
