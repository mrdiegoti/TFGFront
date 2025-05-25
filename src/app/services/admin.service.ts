import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  // private baseUrl = 'https://hoopsfever.up.railway.app/api/admin';
  private baseUrl = 'http://localhost:8000/api/admin';

  constructor(private http: HttpClient) {}

  // Headers con JWT
  getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // o el método que uses
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  // Usuarios
  getUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/users`, {
      headers: this.getAuthHeaders(),
    });
  }

  createUser(data: any) {
    return this.http.post(`${this.baseUrl}/users`, data, {
      headers: this.getAuthHeaders(),
    });
  }

  updateUser(id: number, data: any) {
    return this.http.put(`${this.baseUrl}/users/${id}`, data, {
      headers: this.getAuthHeaders(),
    });
  }

  deleteUser(id: number) {
    return this.http.delete(`${this.baseUrl}/users/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }

  // Conversaciones
  getConversations(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/conversations`, {
      headers: this.getAuthHeaders(),
    });
  }

  createConversation(data: any) {
    return this.http.post(`${this.baseUrl}/conversations`, data, {
      headers: this.getAuthHeaders(),
    });
  }

  updateConversation(id: number, data: any) {
  return this.http.put(`${this.baseUrl}/conversations/${id}`, data, {
    headers: this.getAuthHeaders()
  });
}


  deleteConversation(id: number) {
    return this.http.delete(`${this.baseUrl}/conversations/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }

  // Comentarios de conversación
  getComments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/comments`, {
      headers: this.getAuthHeaders(),
    });
  }

  createComment(data: any) {
    return this.http.post(`${this.baseUrl}/comments`, data, {
      headers: this.getAuthHeaders(),
    });
  }

  updateComment(id: number, data: any) {
    return this.http.put(`${this.baseUrl}/comments/${id}`, data, {
      headers: this.getAuthHeaders(),
    });
  }

  deleteComment(id: number) {
    return this.http.delete(`${this.baseUrl}/comments/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }

  // Comentarios de partidos
  getGameComments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/game-comments`, {
      headers: this.getAuthHeaders(),
    });
  }

  createGameComment(data: any) {
    return this.http.post(`${this.baseUrl}/game-comments`, data, {
      headers: this.getAuthHeaders(),
    });
  }

  updateGameComment(id: number, data: any) {
    return this.http.put(`${this.baseUrl}/game-comments/${id}`, data, {
      headers: this.getAuthHeaders(),
    });
  }

  deleteGameComment(id: number) {
    return this.http.delete(`${this.baseUrl}/game-comments/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }
}
