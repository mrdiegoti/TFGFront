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
