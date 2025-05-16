import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ForumService } from '../../services/forum.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css'],
})
export class ConversationComponent implements OnInit {
  conversacion: any;
  comentarios: any[] = [];
  nuevoComentario = '';
  usuarioActualId: number = 0;
auth: any;

  constructor(private route: ActivatedRoute, private forumService: ForumService) {}

  ngOnInit() {
    this.obtenerUsuarioActual();
    this.cargarConversacion();
  }

  obtenerUsuarioActual() {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      this.usuarioActualId = payload?.user?.id ?? 0;
    }
  }

  cargarConversacion() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.forumService.getConversation(id).subscribe({
      next: (data) => {
        this.conversacion = data;
        this.comentarios = data.comentarios || [];
      },
      error: (err) => console.error('Error cargando conversación', err),
    });
  }

  enviarComentario() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const comentario = { texto: this.nuevoComentario };

    this.forumService.createComment(id, comentario).subscribe({
      next: (nuevo) => {
        this.nuevoComentario = '';
        this.cargarConversacion();
      },
      error: (err) => console.error('Error enviando comentario', err),
    });
  }

  editarComentario(comentario: any) {
    comentario.editando = true;
    comentario.textoOriginal = comentario.texto;
  }

  cancelarEdicionComentario(comentario: any) {
    comentario.texto = comentario.textoOriginal;
    comentario.editando = false;
  }

  guardarEdicionComentario(comentario: any) {
    this.forumService.updateComment(comentario.id, { texto: comentario.texto }).subscribe({
      next: () => {
        comentario.editando = false;
        this.cargarConversacion();
      },
      error: (err) => {
        console.error('Error actualizando comentario:', err);
        alert('No se pudo actualizar el comentario, no eres el propietario');
      },
    });
  }

  eliminarComentario(id: number) {
    if (confirm('¿Estás seguro que quieres eliminar este comentario?')) {
      this.forumService.deleteComment(id).subscribe({
        next: () => {
          this.cargarConversacion();
        },
        error: (err) => {
          console.error('Error eliminando comentario:', err);
          alert('No se pudo eliminar el comentario, no eres el propietario');
        },
      });
    }
  }
}
