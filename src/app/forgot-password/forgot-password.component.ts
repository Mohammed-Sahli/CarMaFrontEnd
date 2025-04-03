import { Component, Inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
  standalone: true,
  imports: [FormsModule],
})
export class ForgotPasswordComponent {
  email: string = '';

  constructor(@Inject(AuthService) private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (!this.email) {
      alert("Veuillez entrer votre adresse e-mail");
      return;
    }

    this.authService.forgotPassword(this.email).subscribe({
      next: () => {
        alert("Un e-mail de réinitialisation a été envoyé.");
        this.router.navigate(['/login']);
      },
      error: (err: any) => {
        console.error('Erreur lors de la demande de réinitialisation', err);
        alert("Erreur lors de l'envoi de l'e-mail.");
      }
    });
  }
}