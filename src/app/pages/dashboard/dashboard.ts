import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CORES, Dados, STATUS, Status } from '../../dados';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink],
  template: `
    <h1 class="fs-4 fw-bold mb-3">Dashboard</h1>

    @for (alerta of alertas(); track alerta) {
      <div class="alert alert-warning alert-dismissible">
        <i class="bi bi-exclamation-triangle me-2"></i>{{ alerta }}
        <button type="button" class="btn-close" aria-label="Fechar" (click)="fechar(alerta)"></button>
      </div>
    }

    <div class="row g-3 mb-3">
      @for (card of indicadores(); track card.nome) {
        <div class="col-sm-6 col-xl-3">
          <div class="panel h-100 d-flex justify-content-between align-items-center">
            <div>
              <div class="text-muted-fo">{{ card.nome }}</div>
              <div class="numero">{{ card.valor }}</div>
            </div>
            <i class="bi icone" [class]="card.icone"></i>
          </div>
        </div>
      }
    </div>

    <div class="row g-3 mb-3">
      <div class="col-lg-7">
        <div class="panel h-100">
          <h2 class="fs-6 fw-bold mb-3">Inspeções por mês</h2>
          <div class="grafico">
            @for (mes of meses; track mes.nome) {
              <div class="coluna">
                <small>{{ mes.total }}</small>
                <div class="barra" [style.height.px]="mes.total * 4"></div>
                <small class="text-muted-fo">{{ mes.nome }}</small>
              </div>
            }
          </div>
        </div>
      </div>

      <div class="col-lg-5">
        <div class="panel h-100">
          <h2 class="fs-6 fw-bold mb-3">Situação das inspeções</h2>
          @for (item of porStatus(); track item.status) {
            <div class="d-flex justify-content-between">
              <span>{{ item.status }}</span><strong>{{ item.quantidade }}</strong>
            </div>
            <div class="progress mb-2" style="height: 8px">
              <div class="progress-bar" [class]="cores[item.status]" [style.width.%]="item.percentual"></div>
            </div>
          }
        </div>
      </div>
    </div>

    <div class="panel">
      <div class="d-flex justify-content-between align-items-center mb-2">
        <h2 class="fs-6 fw-bold mb-0">Inspeções recentes</h2>
        <a class="btn btn-sm btn-brand" routerLink="/acompanhamento">Ver todas</a>
      </div>
      <div class="table-responsive">
        <table class="table align-middle mb-0">
          <thead>
            <tr><th>Nº</th><th>Equipamento</th><th>Cliente</th><th>Data</th><th>Status</th></tr>
          </thead>
          <tbody>
            @for (item of recentes(); track item.id) {
              <tr>
                <td>#{{ item.id }}</td>
                <td>{{ item.equipamento }}</td>
                <td>{{ item.cliente }}</td>
                <td>{{ item.data }}</td>
                <td><span class="badge" [class]="cores[item.status]">{{ item.status }}</span></td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  `,
})
export class Dashboard {
  private readonly dados = inject(Dados);
  protected readonly cores = CORES;

  protected readonly alertas = signal([
    'Inspeção #1045 reprovada: é necessário reagendar.',
    'Há resultados aguardando a sua revisão.',
  ]);

  protected readonly meses = [
    { nome: 'Jun', total: 18 },
    { nome: 'Jul', total: 24 },
    { nome: 'Ago', total: 21 },
    { nome: 'Set', total: 30 },
    { nome: 'Out', total: 27 },
    { nome: 'Nov', total: 33 },
  ];

  protected readonly recentes = computed(() => this.dados.inspecoes().slice(0, 5));

  protected readonly indicadores = computed(() => {
    const lista = this.dados.inspecoes();
    const contar = (status: Status) => lista.filter((i) => i.status === status).length;
    return [
      { nome: 'Total de inspeções', valor: lista.length, icone: 'bi-clipboard-data' },
      { nome: 'Em andamento', valor: contar('Em andamento'), icone: 'bi-play-circle' },
      { nome: 'Aguardando revisão', valor: contar('Concluída'), icone: 'bi-hourglass-split' },
      { nome: 'Reprovadas', valor: contar('Reprovada'), icone: 'bi-x-circle' },
    ];
  });

  protected readonly porStatus = computed(() => {
    const lista = this.dados.inspecoes();
    return STATUS.map((status) => {
      const quantidade = lista.filter((i) => i.status === status).length;
      return { status, quantidade, percentual: (quantidade / lista.length) * 100 };
    });
  });

  protected fechar(alerta: string): void {
    this.alertas.update((lista) => lista.filter((a) => a !== alerta));
  }
}
