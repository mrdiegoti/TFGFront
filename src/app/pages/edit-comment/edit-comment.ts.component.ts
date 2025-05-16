import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ForumService } from 'src/app/services/forum.service';

@Component({
  selector: 'app-edit-comment',
  template: `
    <div>
      <h2>Editar Comentario</h2>
      <form (ngSubmit)="updateComment()">
        <textarea [(ngModel)]="comentario.contenido" name="contenido" required></textarea>
        <button type="submit">Actualizar</button>
      </form>
    </div>
  `,
})
export class EditCommentComponent implements OnInit {
  commentId!: number;
  comentario: any = { contenido: '' };

  constructor(
    private route: ActivatedRoute,
    private forumService: ForumService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.commentId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadComment();
  }

  loadComment(): void {
    this.forumService.getCommentById(this.commentId).subscribe({
      next: (data: { contenido: any; }) => {
        this.comentario = { contenido: data.contenido };
      },
      error: (err: any) => {
        console.error('Error cargando comentario:', err);
        alert('No se pudo cargar el comentario.');
      }
    });
  }

  updateComment(): void {
    this.forumService.updateComment(this.commentId, this.comentario).subscribe({
      next: () => {
        alert('Comentario actualizado');
        this.router.navigate(['/forum']); // o a la conversación específica
      },
      error: (err) => {
        console.error('Error actualizando comentario:', err);
        alert('Error al actualizar el comentario');
      }
    });
  }
}
