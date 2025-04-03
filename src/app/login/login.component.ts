import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms'; // Importation nécessaire

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true, // Si c'est un standalone component
  imports: [FormsModule], // Ajoute FormsModule ici
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(@Inject(AuthService) private authService: AuthService, private router: Router) {}

  onLogin() {
    console.log(this.email,this.password)
    this.authService.login(this.email, this.password).subscribe({
      next: (response: { token: string }) => {
        this.router.navigate(['/accueil']); // Redirection après connexion réussie
      },
      error: (err: any) => {
        console.error('Erreur de connexion', err);
        alert('Utilisateur ou mot de passe incorrect');
      },
    });
  }
}