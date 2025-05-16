import { Component, OnInit } from '@angular/core';
import { ForumService } from '../../services/forum.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css'],
})
export class ForumComponent implements OnInit {
  conversaciones: any[] = [];

  constructor(
    private forum: ForumService,
    public auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.auth.getUser();

    this.forum.getConversations().subscribe({
      next: (data) => {
        // Mostrar solo las 3 últimas conversaciones
        this.conversaciones = data.slice(-3).reverse();
      },
      error: (err) => {
        console.error('Error cargando conversaciones', err);
      },
    });
  }

  logout(): void {
    this.auth.logout();
  }

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
        console.error('Error eliminando conversación:', err);
        alert('Error al eliminar la conversación, no eres el propietario.');
      },
    });
  }

  verTodas(): void {
  this.router.navigate(['/conversaciones']);
}

}
