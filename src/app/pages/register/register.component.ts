import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  user: User = { name: '', email: '', password: '', password_confirmation: '' };
  error: string = '';

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit() {
    this.auth.register(this.user).subscribe({
      next: () => this.router.navigate(['/']),
      error: err => this.error = 'Error al registrar usuario'
    });
  }
}
