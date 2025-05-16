import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ForumService } from '../../services/forum.service';

@Component({
  selector: 'app-create-conversation',
  templateUrl: './create-conversation.component.html',
  styleUrls: ['./create-conversation.component.css']
})
export class CreateConversationComponent {
  titulo: string = '';
  descripcion: string = '';
  error: string = '';

  constructor(private forum: ForumService, private router: Router) {}

  crearConversacion(): void {
    if (!this.titulo || !this.descripcion) {
      this.error = 'Por favor, completa todos los campos.';
      return;
    }

    const nueva = {
      titulo: this.titulo,
      descripcion: this.descripcion
    };

    this.forum.createConversation(nueva).subscribe({
      next: (response: any) => {
        const id = response.id;
        this.router.navigate(['/forum']);
      },
      error: err => {
        console.error(err);
        this.error = 'Error al crear la conversación';
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/conversaciones']);
  }
}
