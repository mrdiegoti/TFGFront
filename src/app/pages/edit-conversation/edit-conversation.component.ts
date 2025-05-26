import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-edit-conversation',
  templateUrl: './edit-conversation.component.html',
  styleUrls: ['./edit-conversation.component.css']
})
export class EditConversationComponent implements OnInit {
  conversationId!: number;
  conversation: any = {
    titulo: '',
    descripcion: ''
  };
  isLoading = true;
  isSubmitting = false;
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.conversationId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadConversation();
  }

  loadConversation(): void {
    this.isLoading = true;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    this.http.get(`${environment.apiUrl}/conversaciones/${this.conversationId}`, { headers }).subscribe({
      next: (data: any) => {
        this.conversation = {
          titulo: data.titulo,
          descripcion: data.descripcion
        };
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading conversation:', err);
        this.errorMessage = 'No se pudo cargar la conversación.';
        this.isLoading = false;
        setTimeout(() => this.errorMessage = null, 5000);
      }
    });
  }

  updateConversation(): void {
    if (!this.conversation.titulo.trim() || !this.conversation.descripcion.trim()) {
      this.errorMessage = 'Título y descripción son requeridos';
      setTimeout(() => this.errorMessage = null, 5000);
      return;
    }

    this.isSubmitting = true;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    this.http.put(`${environment.apiUrl}/conversaciones/${this.conversationId}`, this.conversation, { headers }).subscribe({
      next: () => {
        this.router.navigate(['/forum'], {
          queryParams: { success: 'Conversación actualizada correctamente' }
        });
      },
      error: (err) => {
        this.isSubmitting = false;
        if (err.status === 403) {
          this.errorMessage = 'No tienes permiso para editar esta conversación';
        } else if (err.status === 404) {
          this.errorMessage = 'La conversación no existe';
        } else {
          this.errorMessage = 'Error al actualizar la conversación';
        }
        setTimeout(() => this.errorMessage = null, 5000);
      }
    });
  }
}