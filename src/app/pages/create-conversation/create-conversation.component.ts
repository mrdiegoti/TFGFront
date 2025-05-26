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
  isLoading: boolean = false;
  successMessage: string = '';

  constructor(private forumService: ForumService, private router: Router) {}

  crearConversacion(): void {
    if (!this.titulo.trim() || !this.descripcion.trim()) {
      this.error = 'Por favor, completa todos los campos.';
      setTimeout(() => this.error = '', 5000);
      return;
    }

    this.isLoading = true;
    this.error = '';

    const nuevaConversacion = {
      titulo: this.titulo.trim(),
      descripcion: this.descripcion.trim()
    };

    this.forumService.createConversation(nuevaConversacion).subscribe({
      next: (response: any) => {
        this.isLoading = false;
        this.successMessage = 'Conversación creada exitosamente!';
        setTimeout(() => {
          this.router.navigate(['/forum']);
        }, 1500);
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Error al crear conversación:', err);
        this.error = err.error?.message || 'Error al crear la conversación';
        setTimeout(() => this.error = '', 5000);
      }
    });
  }

  cancelar(): void {
    if (this.titulo || this.descripcion) {
      if (confirm('¿Estás seguro de que deseas cancelar? Los cambios no se guardarán.')) {
        this.router.navigate(['/forum']);
      }
    } else {
      this.router.navigate(['/forum']);
    }
  }
}