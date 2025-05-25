import { Component, OnInit } from '@angular/core';
import { ForumService } from '../../services/forum.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-conversations',
  templateUrl: './all-conversations.component.html',
  styleUrls: ['./all-conversations.component.css']
})
export class AllConversationsComponent implements OnInit {
  conversaciones: any[] = [];

  constructor(private forum: ForumService, private router: Router) {}

  ngOnInit(): void {
    this.forum.getConversations().subscribe({
      next: (data) => {
        this.conversaciones = data;
      },
      error: (err) => {
        console.error('Error cargando todas las conversaciones', err);
      }
    });
  }

  verConversacion(id: number): void {
    this.router.navigate(['/conversacion', id]);
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
        console.error('Error eliminando conversación:', err);
        alert('No se pudo eliminar la conversación, no eres el propietario');
        this.router.navigate(['/conversaciones']);
      },
    });
  }
}
