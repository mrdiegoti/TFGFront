import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GameComment } from '../models/game-comment.model';

@Injectable({
  providedIn: 'root',
})
export class GameCommentService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  // Obtener comentarios de un partido (pública)
  getComments(gameId: string): Observable<GameComment[]> {
    return this.http.get<GameComment[]>(`${this.apiUrl}/games/${gameId}/comments`);
  }

  // Crear comentario (protegida)
  postComment(gameId: string, comment: string): Observable<GameComment> {
    return this.http.post<GameComment>(
      `${this.apiUrl}/games/${gameId}/comments`,
      { content: comment },
      { headers: this.getAuthHeaders() }
    );
  }

  // Editar comentario (protegida)
  updateComment(id: number, content: string): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/games/comments/${id}`,
      { content },
      { headers: this.getAuthHeaders() }
    );
  }

  // Eliminar comentario (protegida)
  deleteComment(commentId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/games/comments/${commentId}`, {
      headers: this.getAuthHeaders(),
    });
  }
}
