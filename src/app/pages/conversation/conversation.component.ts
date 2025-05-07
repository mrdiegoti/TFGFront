import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ForumService } from '../../services/forum.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html'
})
export class ConversationComponent implements OnInit {
  nuevoComentario = '';

  enviarComentario() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
  
    const comentario = {
      texto: this.nuevoComentario
    };
  
    this.forum.createComment(id, comentario).subscribe({
      next: nuevo => {
        this.comentarios.push(nuevo); // Añadimos el nuevo comentario a la lista
        this.nuevoComentario = '';    // Limpiamos el textarea
      },
      error: err => console.error('Error enviando comentario', err)
    });
  }
  

  conversacion: any;
  comentarios: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private forum: ForumService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.forum.getConversation(id).subscribe({
      next: data => {
        this.conversacion = data;
        this.comentarios = data.comentarios || [];
      },
      error: err => console.error('Error cargando conversación', err)
    });
  }

  
}
