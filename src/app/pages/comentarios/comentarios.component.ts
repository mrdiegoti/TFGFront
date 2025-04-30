import { Component, OnInit, Input } from '@angular/core';
import { ForumService } from '../../services/forum.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.css']
})
export class ComentariosComponent implements OnInit {
  @Input() conversacionId!: number;
  comentarios: any[] = [];
  nuevoComentario: string = '';

  constructor(private forum: ForumService, private auth: AuthService) {}

  ngOnInit(): void {
    this.cargarComentarios();
  }

  cargarComentarios(): void {
    this.forum.getComments(this.conversacionId).subscribe({
      next: (data: any[]) => {
        this.comentarios = data;
      },
      error: (err: any) => {
        console.error('Error cargando comentarios:', err);
      }
    });
  }

  enviarComentario(): void {
    if (!this.nuevoComentario.trim()) return;

    this.forum.createComment(this.conversacionId, { contenido: this.nuevoComentario }).subscribe({
      next: () => {
        this.nuevoComentario = '';
        this.cargarComentarios();
      },
      error: (err: any) => {
        console.error('Error enviando comentario:', err);
      }
    });
  }
}
