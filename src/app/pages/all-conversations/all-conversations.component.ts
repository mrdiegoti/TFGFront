import { Component, OnInit } from '@angular/core';
import { ForumService } from '../../services/forum.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-conversations',
  templateUrl: './all-conversations.component.html',
  styleUrls: ['./all-conversations.component.css']
})
export class AllConversationsComponent implements OnInit {
  conversaciones: any[] = [];

  constructor(private forum: ForumService, private router: Router) {}

  ngOnInit(): void {
    this.forum.getConversations().subscribe({
      next: (data) => {
        this.conversaciones = data;
      },
      error: (err) => {
        console.error('Error cargando todas las conversaciones', err);
      }
    });
  }

  verConversacion(id: number): void {
    this.router.navigate(['/conversacion', id]);
  }
}
