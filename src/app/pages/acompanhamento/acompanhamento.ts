import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CORES, Dados, STATUS, Status } from '../../dados';

type Filtro = Status | 'Todas';

@Component({
  selector: 'app-acompanhamento',
  imports: [RouterLink],
  template: `
    <h1 class="fs-4 fw-bold mb-3">Acompanhamento das inspeções</h1>

    <div class="d-flex flex-wrap gap-2 mb-3">
      @for (opcao of filtros; track opcao) {
        <button type="button" class="btn btn-sm"
          [class]="filtro() === opcao ? 'btn-brand' : 'btn-outline-secondary'"
          (click)="filtro.set(opcao)">
          {{ opcao }}
        </button>
      }
    </div>

    <div class="panel">
      <div class="table-responsive">
        <table class="table align-middle mb-0">
          <thead>
            <tr>
              <th>Nº</th><th>Equipamento</th><th>Cliente</th><th>Técnico</th>
              <th>Data</th><th>Progresso</th><th>Status</th><th></th>
            </tr>
          </thead>
          <tbody>
            @for (item of lista(); track item.id) {
              <tr>
                <td>#{{ item.id }}</td>
                <td>{{ item.equipamento }}</td>
                <td>{{ item.cliente }}</td>
                <td>{{ item.tecnico }}</td>
                <td>{{ item.data }}</td>
                <td style="min-width: 110px">
                  <div class="progress" style="height: 8px">
                    <div class="progress-bar bg-danger" [style.width.%]="item.progresso"></div>
                  </div>
                  <small class="text-muted-fo">{{ item.progresso }}%</small>
                </td>
                <td><span class="badge" [class]="cores[item.status]">{{ item.status }}</span></td>
                <td class="text-end">
                  @if (item.status === 'Concluída') {
                    <a class="btn btn-sm btn-brand" [routerLink]="['/revisao', item.id]">Revisar</a>
                  }
                </td>
              </tr>
            } @empty {
              <tr><td colspan="8" class="text-center text-muted-fo">Nenhuma inspeção neste status.</td></tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  `,
})
export class Acompanhamento {
  private readonly dados = inject(Dados);
  protected readonly cores = CORES;
  protected readonly filtros: Filtro[] = ['Todas', ...STATUS];
  protected readonly filtro = signal<Filtro>('Todas');

  protected readonly lista = computed(() =>
    this.dados.inspecoes().filter((i) => this.filtro() === 'Todas' || i.status === this.filtro()),
  );
}
