import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Frontend';

  constructor(private auth: AuthService, private router: Router) {}

  logout(): void {
    console.log('Cerrando sesión...');
    this.auth.logout(); // Llama al método logout del servicio AuthService
    this.router.navigate(['/login']); // Redirige al login después de cerrar sesión
  }
}