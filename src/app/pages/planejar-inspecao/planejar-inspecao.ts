import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { Dados } from '../../dados';

@Component({
  selector: 'app-planejar-inspecao',
  imports: [FormsModule, RouterLink],
  template: `
    <h1 class="fs-4 fw-bold mb-3">Planejar inspeção</h1>

    @if (mensagem()) {
      <div class="alert alert-success">
        {{ mensagem() }}
        <a class="alert-link" routerLink="/acompanhamento">Ver no acompanhamento</a>
      </div>
    }

    <form #form="ngForm" class="panel" (ngSubmit)="salvar(form)">
      <div class="row g-3">
        <label class="col-md-4">
          Cliente
          <select class="form-select mt-1" name="cliente" required
            [ngModel]="cliente()" (ngModelChange)="escolherCliente($event)">
            <option value="" disabled>Selecione</option>
            @for (linha of dados.clientes(); track linha) {
              <option [value]="linha[0]">{{ linha[0] }}</option>
            }
          </select>
        </label>

        <label class="col-md-4">
          Local
          <select class="form-select mt-1" name="local" required
            [ngModel]="local()" (ngModelChange)="escolherLocal($event)">
            <option value="" disabled>Selecione</option>
            @for (linha of locais(); track linha) {
              <option [value]="linha[0]">{{ linha[0] }}</option>
            }
          </select>
        </label>

        <label class="col-md-4">
          Equipamento
          <select class="form-select mt-1" name="equipamento" required
            [ngModel]="equipamento()" (ngModelChange)="equipamento.set($event)">
            <option value="" disabled>Selecione</option>
            @for (linha of equipamentos(); track linha) {
              <option [value]="linha[1]">{{ linha[0] }} - {{ linha[1] }}</option>
            }
          </select>
        </label>

        <label class="col-md-6">
          Modelo de checklist
          <select class="form-select mt-1" name="modelo" ngModel required>
            <option value="" disabled>Selecione</option>
            @for (linha of dados.modelos(); track linha) {
              <option [value]="linha[0]">{{ linha[0] }}</option>
            }
          </select>
        </label>

        <label class="col-md-6">
          Técnico responsável
          <select class="form-select mt-1" name="tecnico" ngModel required>
            <option value="" disabled>Selecione</option>
            @for (nome of tecnicos; track nome) {
              <option [value]="nome">{{ nome }}</option>
            }
          </select>
        </label>

        <label class="col-md-6">
          Data
          <input type="date" class="form-control mt-1" name="data" ngModel required>
        </label>

        <label class="col-md-6">
          Prioridade
          <select class="form-select mt-1" name="prioridade" ngModel="Média">
            <option value="Baixa">Baixa</option>
            <option value="Média">Média</option>
            <option value="Alta">Alta</option>
          </select>
        </label>

        <label class="col-12">
          Observações
          <textarea class="form-control mt-1" name="observacoes" rows="3" ngModel></textarea>
        </label>

        <div class="col-12 text-end">
          <button type="submit" class="btn btn-brand" [disabled]="form.invalid">
            <i class="bi bi-calendar-plus me-1"></i>Agendar inspeção
          </button>
        </div>
      </div>
    </form>
  `,
})
export class PlanejarInspecao {
  protected readonly dados = inject(Dados);
  protected readonly tecnicos = ['Ana Costa', 'João Pereira', 'Lucas Lima'];

  protected readonly cliente = signal('');
  protected readonly local = signal('');
  protected readonly equipamento = signal('');
  protected readonly mensagem = signal('');

  // Cada lista depende da escolha anterior.
  protected readonly locais = computed(() =>
    this.dados.locais().filter((linha) => linha[1] === this.cliente()),
  );
  protected readonly equipamentos = computed(() =>
    this.dados.equipamentos().filter((linha) => linha[3] === this.local()),
  );

  protected escolherCliente(nome: string): void {
    this.cliente.set(nome);
    this.escolherLocal('');
  }

  protected escolherLocal(nome: string): void {
    this.local.set(nome);
    this.equipamento.set('');
  }

  protected salvar(form: NgForm): void {
    if (form.invalid) return;

    const { tecnico, data } = form.value;
    const id = Math.max(0, ...this.dados.inspecoes().map((i) => i.id)) + 1;

    this.dados.inspecoes.update((lista) => [
      {
        id,
        equipamento: this.equipamento(),
        cliente: this.cliente(),
        tecnico,
        data: String(data).split('-').reverse().join('/'),
        status: 'Agendada',
        progresso: 0,
      },
      ...lista,
    ]);

    this.mensagem.set(`Inspeção #${id} agendada para ${tecnico}.`);
    form.resetForm({ modelo: '', tecnico: '', data: '', prioridade: 'Média', observacoes: '' });
    this.escolherCliente('');
  }
}
