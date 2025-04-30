import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  user: User = { email: '', password: '' };
  error: string = '';

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit() {
    this.auth.login(this.user).subscribe({
      next: (res) => {
        console.log('Token recibido y guardado:', this.auth.getToken());
        this.router.navigate(['/']);
      },
      error: err => {
        console.error('Error al iniciar sesión', err);
        this.error = 'Email o contraseña incorrectos';
      }
    });
  }
}
