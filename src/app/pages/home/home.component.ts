import { Component, OnInit } from '@angular/core';
import { ForumService } from '../../services/forum.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  ultimasConversaciones: any[] = [];

  constructor(private forumService: ForumService, private router: Router) {}

  ngOnInit(): void {
    this.forumService.getConversations().subscribe({
      next: data => {
        this.ultimasConversaciones = data
          .sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
          .slice(0, 3);
      },
      error: err => console.error('Error al cargar conversaciones', err)
    });
  }

  irAConversacion(id: number): void {
    this.router.navigate(['/conversacion', id]);
  }
}
