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
  http: any;
  api: any;

  constructor(
    private forum: ForumService,
    public auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.forum.getConversations().subscribe({
      next: (data) => {
        console.log('Conversaciones obtenidas:', data);
        this.conversaciones = data;
      },
      error: (err) => {
        console.error('Error cargando conversaciones', err);
      },
    });

    this.auth.getUser();
  }
  

  logout(): void {
    console.log('Click en logout');
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
    if (!confirm('¿Estás seguro de que deseas eliminar esta conversación?'))
      return;

    this.forum.deleteConversation(id).subscribe({
      next: () => {
        this.conversaciones = this.conversaciones.filter(
          (conv) => conv.id !== id
        );
      },
      error: (err) => {
        console.error('Error eliminando conversación:', err);
      },
    });
  }

  deleteConversation(id: number) {
  return this.http.delete(`${this.api}/conversaciones/${id}`, {
    headers: this.getAuthHeaders()
  });
}
  getAuthHeaders() {
    throw new Error('Method not implemented.');
  }

}
