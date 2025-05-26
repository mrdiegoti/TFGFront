import { Component, OnInit } from '@angular/core';
import { ForumService } from '../../services/forum.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {
  conversaciones: any[] = [];

  constructor(
    private forum: ForumService,
    public auth: AuthService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.loadConversations();
  }

  private loadConversations(): void {
    this.auth.getUser();
    
    this.forum.getConversations().subscribe({
      next: (data) => {
        this.conversaciones = data.slice(-3).reverse();
      },
      error: (err) => {
        console.error('Error cargando conversaciones', err);
      }
    });
  }

  // Métodos existentes (sin cambios en funcionalidad)
  verConversacion(id: number): void {
    this.router.navigate(['/conversacion', id]);
  }

  crearConversacion(): void {
    this.router.navigate(['/create-conversation']);
  }

  editarConversacion(id: number): void {
    this.router.navigate(['/edit-conversation', id]);
  }

  eliminarConversacion(id: number): void {
    if (!confirm('¿Estás seguro de que deseas eliminar esta conversación?')) return;

    this.forum.deleteConversation(id).subscribe({
      next: () => {
        this.conversaciones = this.conversaciones.filter(conv => conv.id !== id);
      },
      error: (err) => {
        if (err && err.error && err.error.message && err.error.message.includes('comentario')) {
          alert('No puedes eliminar la conversación porque ya hay comentarios en ella.');
        } else {
          console.error('Error eliminando conversación:', err);
          alert('Error al eliminar la conversación, no eres el propietario.');
        }
      }
    });
  }
}