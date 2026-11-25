import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { CORES, Dados, Status } from '../../dados';

@Component({
  selector: 'app-revisao-inspecao',
  imports: [FormsModule, RouterLink],
  template: `
    @let item = inspecao();

    <div class="d-flex flex-wrap align-items-center gap-2 mb-3">
      <h1 class="fs-4 fw-bold mb-0">Revisão da inspeção #{{ item.id }}</h1>
      <span class="badge" [class]="cores[item.status]">{{ item.status }}</span>
      <a class="btn btn-sm btn-outline-secondary ms-auto" routerLink="/acompanhamento">Voltar</a>
    </div>

    <div class="panel mb-3">
      <div class="row g-2">
        <div class="col-6 col-md-3"><span class="text-muted-fo d-block">Equipamento</span>{{ item.equipamento }}</div>
        <div class="col-6 col-md-3"><span class="text-muted-fo d-block">Cliente</span>{{ item.cliente }}</div>
        <div class="col-6 col-md-3"><span class="text-muted-fo d-block">Técnico</span>{{ item.tecnico }}</div>
        <div class="col-6 col-md-3"><span class="text-muted-fo d-block">Data</span>{{ item.data }}</div>
      </div>
    </div>

    <div class="row g-3">
      <div class="col-lg-8">
        <div class="panel mb-3">
          <h2 class="fs-6 fw-bold">Respostas do checklist</h2>
          <div class="table-responsive">
            <table class="table align-middle mb-0">
              <thead><tr><th>Item</th><th>Resultado</th><th>Observação</th></tr></thead>
              <tbody>
                @for (resposta of checklist; track resposta.item) {
                  <tr>
                    <td>{{ resposta.item }}</td>
                    <td>
                      <span class="badge" [class]="resposta.conforme ? 'text-bg-success' : 'text-bg-danger'">
                        {{ resposta.conforme ? 'Conforme' : 'Não conforme' }}
                      </span>
                    </td>
                    <td>{{ resposta.observacao }}</td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </div>

        <div class="panel">
          <h2 class="fs-6 fw-bold">Evidências</h2>
          <div class="row g-2">
            @for (foto of evidencias; track foto) {
              <div class="col-6 col-md-4">
                <div class="evidencia"><div><i class="bi bi-camera fs-3 d-block"></i>{{ foto }}</div></div>
              </div>
            }
          </div>
        </div>
      </div>

      <div class="col-lg-4">
        <div class="alert alert-danger">
          <strong><i class="bi bi-exclamation-triangle me-1"></i>Não conformidade</strong>
          <div>Vazamento identificado na conexão de saída.</div>
        </div>

        <div class="panel">
          <h2 class="fs-6 fw-bold">Parecer do supervisor</h2>
          @if (item.status === 'Concluída') {
            <textarea class="form-control mb-2" rows="4" placeholder="Escreva sua avaliação"
              aria-label="Parecer" [(ngModel)]="parecer"></textarea>
            @if (erro()) {
              <div class="text-danger mb-2">{{ erro() }}</div>
            }
            <div class="d-flex gap-2">
              <button type="button" class="btn btn-success flex-fill" (click)="revisar('Aprovada')">
                <i class="bi bi-check-circle me-1"></i>Aprovar
              </button>
              <button type="button" class="btn btn-brand flex-fill" (click)="revisar('Reprovada')">
                <i class="bi bi-x-circle me-1"></i>Reprovar
              </button>
            </div>
          } @else {
            <p class="mb-0 text-muted-fo">
              A revisão só fica disponível para inspeções concluídas. Status atual: {{ item.status }}.
            </p>
          }
        </div>
      </div>
    </div>
  `,
})
export class RevisaoInspecao {
  private readonly dados = inject(Dados);
  private readonly route = inject(ActivatedRoute);
  private readonly id = this.escolherId();

  protected readonly cores = CORES;
  protected readonly erro = signal('');
  protected parecer = '';

  protected readonly inspecao = computed(
    () => this.dados.inspecoes().find((i) => i.id === this.id)!,
  );

  protected readonly checklist = [
    { item: 'Estrutura sem danos aparentes', conforme: true, observacao: '-' },
    { item: 'Conexões sem vazamentos', conforme: false, observacao: 'Vazamento na saída' },
    { item: 'Sinalização de segurança', conforme: true, observacao: '-' },
    { item: 'Teste de funcionamento', conforme: true, observacao: 'Operação normal' },
  ];

  protected readonly evidencias = ['Visão geral', 'Conexão de saída', 'Placa de identificação'];

  protected revisar(status: Status): void {
    if (status === 'Reprovada' && !this.parecer.trim()) {
      this.erro.set('Para reprovar, escreva o motivo no parecer.');
      return;
    }
    this.erro.set('');
    this.dados.atualizarStatus(this.id, status);
  }

  // Usa o número da rota; sem ele, abre a primeira inspeção pendente de revisão.
  private escolherId(): number {
    const pedido = Number(this.route.snapshot.paramMap.get('id'));
    const lista = this.dados.inspecoes();
    const escolhida =
      lista.find((i) => i.id === pedido) ??
      lista.find((i) => i.status === 'Concluída') ??
      lista.find((i) => i.progresso === 100) ??
      lista[0];
    return escolhida.id;
  }
}
