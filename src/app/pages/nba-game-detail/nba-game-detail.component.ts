import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { GameComment } from 'src/app/models/game-comment.model';
import { GameCommentService } from 'src/app/services/game-comment.service'; // ajusta la ruta si es necesario
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nba-game-detail',
  templateUrl: './nba-game-detail.component.html',
  styleUrls: ['./nba-game-detail.component.css']
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

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private gameCommentService: GameCommentService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.gameId = this.route.snapshot.paramMap.get('id');
    if (this.gameId) {
      this.http.get<any>(`http://localhost:8000/api/nba/game/${this.gameId}`).subscribe({
        next: (data) => {
          this.partido = data;
          this.estadisticas = data.statistics;

          console.log('Partido completo:', this.partido);

          this.cargarComentarios(this.gameId!);
        },
        error: () => {
          this.error = 'Error al obtener los detalles del partido';
        }
      });
    }

    // this.isAuthenticated = this.authService.isLoggedIn();
  }

  cargarComentarios(gameId: string) {
    this.gameCommentService.getComments(gameId).subscribe({
      next: (res: GameComment[]) => this.comentarios = res,
      error: (err: any) => console.error('Error cargando comentarios', err)
    });
  }

  enviarComentario() {
    if (!this.nuevoComentario.trim() || !this.gameId) return;

    this.gameCommentService.postComment(this.gameId, this.nuevoComentario).subscribe({
      next: (nuevo: any) => {
        this.comentarios.unshift(nuevo);
        this.nuevoComentario = '';
      },
      error: (err: any) => console.error('Error al enviar comentario', err)
    });
  }
}
