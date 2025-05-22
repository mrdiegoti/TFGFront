import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GameComment } from '../models/game-comment.model';

@Injectable({
  providedIn: 'root',
})
export class GameCommentService {
  private apiUrl = 'http://localhost:8000/api/games';
  
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  constructor(private http: HttpClient) {}

  getComments(gameId: string): Observable<GameComment[]> {
    return this.http.get<GameComment[]>(`${this.apiUrl}/${gameId}/comments`);
  }

  postComment(gameId: string, comment: string): Observable<GameComment> {
    return this.http.post<GameComment>(`${this.apiUrl}/${gameId}/comments`, {
      content: comment,
    });
  }

  // Editar comentario
  updateComment(commentId: number, content: string): Observable<any> {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(`${this.apiUrl}/games/comments/${commentId}`, { content }, { headers });
  }

  // Eliminar comentario
  deleteComment(commentId: number): Observable<any> {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${this.apiUrl}/games/comments/${commentId}`, { headers });
  }
}
