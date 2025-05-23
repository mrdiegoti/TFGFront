import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service'; // Ajusta la ruta si es necesario
import { Router } from '@angular/router';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  user: User = {
    email: '',
    password: ''
  };
error: any;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.authService.login(this.user).subscribe({
      next: () => {
        this.authService.getUser().subscribe({
          next: (res: any) => {
            if (res.role_id === 1) {
              this.router.navigate(['/admin']);
            } else {
              this.router.navigate(['/home']);
            }
          },
          error: (err: any) => {
            console.error('Error al obtener usuario después del login', err);
            this.router.navigate(['/home']);
          }
        });
      },
      error: (err: any) => {
        console.error('Error al iniciar sesión', err);
      }
    });
  }
}
