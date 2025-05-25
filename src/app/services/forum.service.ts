import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';



@Injectable({ providedIn: 'root' })
export class ForumService {
  crearComentario(conversacionId: number, arg1: { contenido: string }) {
    throw new Error('Method not implemented.');
  }
  getComentarios(conversacionId: number) {
    throw new Error('Method not implemented.');
  }
  private api = 'http://localhost:8000/api'; // URL de tu backend
  // private api = 'https://hoopsfever.up.railway.app/api'; // URL de tu backend

  constructor(private http: HttpClient) {}

  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    if (token) {
      return new HttpHeaders().set('Authorization', `Bearer ${token}`);
    }
    return new HttpHeaders();
  }

  getConversations() {
    return this.http.get<any[]>(`${this.api}/conversaciones`, {
      headers: this.getAuthHeaders(),
    });
  }

  getConversation(id: number) {
    return this.http.get<any>(`${this.api}/conversaciones/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }

  createConversation(conversacion: any) {
    return this.http.post(`${this.api}/conversaciones`, conversacion, {
      headers: this.getAuthHeaders(),
    });
  }

  updateConversation(id: number, conversacion: any) {
    return this.http.put(`${this.api}/conversaciones/${id}`, conversacion, {
      headers: this.getAuthHeaders(),
    });
  }

  deleteConversation(id: number) {
    return this.http.delete(`${this.api}/conversaciones/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }

  createComment(conversacionId: number, comentario: any) {
    return this.http.post(
      `${this.api}/conversaciones/${conversacionId}/comentarios`,
      comentario,
      {
        headers: this.getAuthHeaders(),
      }
    );
  }

  updateComment(id: number, comentario: any) {
    return this.http.put(`${this.api}/comentarios/${id}`, comentario, {
      headers: this.getAuthHeaders(),
    });
  }

  deleteComment(id: number) {
    return this.http.delete(`${this.api}/comentarios/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }

  getComments(conversacionId: number) {
    return this.http.get<any[]>(
      `${this.api}/conversaciones/${conversacionId}/comentarios`,
      {
        headers: this.getAuthHeaders(),
      }
    );
  }

  getConversationById(id: number) {
  return this.http.get(`${this.api}/converasciones/${id}`);
}

getCommentById(id: number) {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });
  return this.http.get<any>(`${this.api}/comentarios/${id}`, { headers });
}

}
