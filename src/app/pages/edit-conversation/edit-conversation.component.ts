// src/app/pages/edit-conversation/edit-conversation.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-edit-conversation',
  templateUrl: './edit-conversation.component.html',
})
export class EditConversationComponent implements OnInit {
  conversationId!: number;
  conversation: any = {
    titulo: '',
    descripcion: ''
  };
  // apiUrl = 'https://hoopsfever.up.railway.app/api';
  apiUrl = 'http://localhost:8000/api';
loading: any;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.conversationId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadConversation();
  }

  loadConversation(): void {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    this.http.get(`${this.apiUrl}/conversaciones/${this.conversationId}`, { headers }).subscribe({
      next: (data: any) => {
        this.conversation = {
          titulo: data.titulo,
          descripcion: data.descripcion
        };
      },
      error: (err) => {
        console.error('Error loading conversation:', err);
        alert('No se pudo cargar la conversación.');
      }
    });
  }

  updateConversation(): void {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    this.http.put(`${this.apiUrl}/conversaciones/${this.conversationId}`, this.conversation, { headers }).subscribe({
      next: () => {
        alert('Conversación actualizada');
        this.router.navigate(['/forum']);
      },
      error: (err) => {
        if (err.status === 403) {
          alert('No puedes editar la conversación porque no eres el propietario.');
        } else {
          console.error('Error updating conversation:', err);
          alert('Error al actualizar la conversación');
        }
      }
    });
  }
}
