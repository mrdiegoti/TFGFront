import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ForumService } from '../../services/forum.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html'
})
export class ConversationComponent implements OnInit {
  conversacion: any;
  comentarios: any[] = [];
  nuevoComentario = '';

  constructor(private route: ActivatedRoute, private forum: ForumService) {}

  ngOnInit() {
    this.cargarConversacion();
  }

  cargarConversacion() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.forum.getConversation(id).subscribe({
      next: data => {
        this.conversacion = data;
        this.comentarios = data.comentarios || [];
      },
      error: err => console.error('Error cargando conversación', err)
    });
  }

  enviarComentario() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const comentario = { texto: this.nuevoComentario };

    this.forum.createComment(id, comentario).subscribe({
      next: (nuevo: { user?: any; [key: string]: any }) => {
        console.log('Comentario creado:', nuevo);

        // Opción A: Añadir directamente si viene con user
        if (nuevo.user) {
          this.comentarios = [...this.comentarios, nuevo]; // actualiza forzando redibujo
        } else {
          // Opción B: recargar desde el backend si el user no viene
          this.cargarConversacion();
        }

        this.nuevoComentario = '';
      },
      error: err => console.error('Error enviando comentario', err)
    });
  }
}
