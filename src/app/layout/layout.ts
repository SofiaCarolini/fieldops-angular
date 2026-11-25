import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  template: `
    <div class="app" [attr.data-bs-theme]="escuro() ? 'dark' : 'light'">
      <aside class="sidebar" [class.aberto]="menuAberto()">
        <div class="d-flex align-items-center gap-2 mb-4">
          <div class="logo"><i class="bi bi-clipboard2-check"></i></div>
          <strong class="fs-5">Field Ops</strong>
        </div>

        <nav class="nav flex-column gap-1">
          @for (item of menu; track item.rota) {
            <a class="nav-link" [routerLink]="item.rota" routerLinkActive="active" (click)="menuAberto.set(false)">
              <i class="bi" [class]="item.icone"></i>{{ item.nome }}
            </a>
          }
        </nav>
      </aside>

      @if (menuAberto()) {
        <div class="fundo d-lg-none" (click)="menuAberto.set(false)"></div>
      }

      <div class="conteudo">
        <header class="topbar d-flex align-items-center gap-2">
          <button type="button" class="btn d-lg-none" aria-label="Abrir menu" (click)="menuAberto.set(true)">
            <i class="bi bi-list fs-4"></i>
          </button>
          <strong class="me-auto">Painel do Supervisor</strong>
          <button type="button" class="btn" aria-label="Alternar modo escuro" (click)="escuro.set(!escuro())">
            <i class="bi" [class]="escuro() ? 'bi-sun' : 'bi-moon'"></i>
          </button>
          <div class="dropdown">
            <button type="button" class="btn dropdown-toggle" data-bs-toggle="dropdown">
              <i class="bi bi-person-circle"></i>
              <span class="d-none d-sm-inline ms-1">Supervisor</span>
            </button>
            <ul class="dropdown-menu dropdown-menu-end">
              <li><a class="dropdown-item" routerLink="/"><i class="bi bi-box-arrow-right me-2"></i>Sair</a></li>
            </ul>
          </div>
        </header>

        <main class="p-3 p-md-4">
          <router-outlet />
        </main>
      </div>
    </div>
  `,
})
export class Layout {
  protected readonly menuAberto = signal(false);
  protected readonly escuro = signal(false);

  protected readonly menu = [
    { rota: '/dashboard', nome: 'Dashboard', icone: 'bi-speedometer2' },
    { rota: '/clientes', nome: 'Clientes', icone: 'bi-people' },
    { rota: '/locais', nome: 'Locais', icone: 'bi-geo-alt' },
    { rota: '/equipamentos', nome: 'Equipamentos', icone: 'bi-cpu' },
    { rota: '/modelos-checklist', nome: 'Modelos de checklist', icone: 'bi-ui-checks' },
    { rota: '/planejar', nome: 'Planejar inspeção', icone: 'bi-calendar-plus' },
    { rota: '/acompanhamento', nome: 'Acompanhamento', icone: 'bi-activity' },
    { rota: '/revisao', nome: 'Revisão', icone: 'bi-patch-check' },
  ];
}
