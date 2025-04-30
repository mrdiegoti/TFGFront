import { Component, OnInit } from '@angular/core';
import { ForumService } from '../../services/forum.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  conversaciones: any[] = [];

  constructor(
    private forum: ForumService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.forum.getConversations().subscribe({
      next: (data) => {
        console.log('Conversaciones obtenidas:', data);
        this.conversaciones = data;
      },
      error: (err) => {
        console.error('Error cargando conversaciones', err);
      }
    });
  }

  logout(): void {
    console.log('Click en logout');
    this.auth.logout();
  }

  verConversacion(id: number): void {
    this.router.navigate(['/conversacion', id]);
  }
}
