import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private readonly router = inject(Router);

  // Protótipo visual: não há autenticação real.
  entrar(event: Event): void {
    event.preventDefault();
    this.router.navigate(['/dashboard']);
  }
}
