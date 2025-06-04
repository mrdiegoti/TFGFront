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
        // .get<any>(`http://localhost:8000/api/nba/game/${this.gameId}`)
        .get<any>(`http://hoopsfever.up.railway.app/api/nba/game/${this.gameId}`)
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

  // Añade estos métodos para manejar los logos
  getLogoUrl(teamName: string): string {
    const slug = teamName.toLowerCase().replace(/ /g, '-');
    return `https://cdn.nba.com/logos/nba/${this.getTeamId(slug)}/global/L/logo.svg`;
  }

  private getTeamId(slug: string): string {
    const teamMap: {[key: string]: string} = {
      'atlanta-hawks': '1610612737',
      'boston-celtics': '1610612738',
      'brooklyn-nets': '1610612751',
      'charlotte-hornets': '1610612766',
      'chicago-bulls': '1610612741',
      'cleveland-cavaliers': '1610612739',
      'dallas-mavericks': '1610612742',
      'denver-nuggets': '1610612743',
      'detroit-pistons': '1610612765',
      'golden-state-warriors': '1610612744',
      'houston-rockets': '1610612745',
      'indiana-pacers': '1610612754',
      'la-clippers': '1610612746',
      'los-angeles-lakers': '1610612747',
      'memphis-grizzlies': '1610612763',
      'miami-heat': '1610612748',
      'milwaukee-bucks': '1610612749',
      'minnesota-timberwolves': '1610612750',
      'new-orleans-pelicans': '1610612740',
      'new-york-knicks': '1610612752',
      'oklahoma-city-thunder': '1610612760',
      'orlando-magic': '1610612753',
      'philadelphia-76ers': '1610612755',
      'phoenix-suns': '1610612756',
      'portland-trail-blazers': '1610612757',
      'sacramento-kings': '1610612758',
      'san-antonio-spurs': '1610612759',
      'toronto-raptors': '1610612761',
      'utah-jazz': '1610612762',
      'washington-wizards': '1610612764',
    };
    return teamMap[slug] || '1610612738'; // Default to Celtics if not found
  }

  getStatusText(status: string): string {
    const statusMap: {[key: string]: string} = {
      'scheduled': 'Programado',
      'in_progress': 'En Vivo',
      'closed': 'Finalizado'
    };
    return statusMap[status] || status;
  }

  // Resto de tus métodos existentes...
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
          this.cargarComentarios(this.gameId!);
        },
        error: (err: any) => console.error('Error al enviar comentario', err),
      });
  }

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