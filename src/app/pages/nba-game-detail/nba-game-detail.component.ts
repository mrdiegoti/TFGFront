import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { GameComment } from 'src/app/models/game-comment.model';
import { GameCommentService } from 'src/app/services/game-comment.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nba-game-detail',
  templateUrl: './nba-game-detail.component.html',
  styleUrls: ['./nba-game-detail.component.css'],
})
export class NbaGameDetailComponent implements OnInit {
  partido: any;
  error: string = '';
  estadisticas!: {
    away: any[];
    home: any[];
  };
  comentarios: GameComment[] = [];
  nuevoComentario: string = '';
  isAuthenticated: boolean = false;

  private gameId: string | null = null;

  // Para edición de comentarios
  comentarioEnEdicionId: number | null = null;
  contenidoEditado: string = '';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private gameCommentService: GameCommentService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.gameId = this.route.snapshot.paramMap.get('id');
    if (this.gameId) {
      this.http
        // .get<any>(`https://hoopsfever.up.railway.app/api/nba/game/${this.gameId}`)
        .get<any>(`http://localhost:8000/api/nba/game/${this.gameId}`)
        .subscribe({
          next: (data) => {
            this.partido = data;
            this.estadisticas = data.statistics;
            this.cargarComentarios(this.gameId!);
          },
          error: () => {
            this.error = 'Error al obtener los detalles del partido';
          },
        });
    }

    this.isAuthenticated = this.authService.isLoggedIn();
  }

  cargarComentarios(gameId: string) {
    this.gameCommentService.getComments(gameId).subscribe({
      next: (res: GameComment[]) => (this.comentarios = res),
      error: (err: any) => console.error('Error cargando comentarios', err),
    });
  }

  enviarComentario() {
    if (!this.nuevoComentario.trim() || !this.gameId) return;

    this.gameCommentService
      .postComment(this.gameId, this.nuevoComentario)
      .subscribe({
        next: () => {
          this.nuevoComentario = '';
          this.cargarComentarios(this.gameId!); // Recargar todos los comentarios con user completo
        },
        error: (err: any) => console.error('Error al enviar comentario', err),
      });
  }

  // Edición inline
  startEditing(comentario: GameComment) {
    this.comentarioEnEdicionId = comentario.id ?? null;
    this.contenidoEditado = comentario.content;
  }

  cancelEditing() {
    this.comentarioEnEdicionId = null;
    this.contenidoEditado = '';
  }

  saveEdit(comentario: GameComment) {
    const contenido = this.contenidoEditado.trim();
    if (!contenido) return;

    if (comentario.id === undefined) {
      console.error('El comentario no tiene un id definido');
      return;
    }

    this.gameCommentService.updateComment(comentario.id, contenido).subscribe({
      next: () => {
        this.cancelEditing();
        // Recarga los comentarios para refrescar datos, incluido usuario
        if (this.gameId) {
          this.cargarComentarios(this.gameId);
        }
      },
      error: (err) => {
        console.error('Error al actualizar comentario', err);
      },
    });
  }

  deleteComment(commentId: number) {
    if (!confirm('¿Estás seguro de que quieres eliminar este comentario?'))
      return;

    this.gameCommentService.deleteComment(commentId).subscribe({
      next: () => {
        this.comentarios = this.comentarios.filter((c) => c.id !== commentId);
      },
      error: (err) => {
        console.error('Error al eliminar comentario', err);
      },
    });
  }
}
