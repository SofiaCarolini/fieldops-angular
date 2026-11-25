import { Component, computed, inject, input, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

import { Dados } from '../../dados';

// Componente reaproveitado pelas quatro telas de cadastro.
@Component({
  selector: 'app-cadastro',
  imports: [FormsModule],
  template: `
    <div class="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
      <div>
        <h1 class="fs-4 fw-bold mb-0">{{ titulo() }}</h1>
        <span class="text-muted-fo">{{ filtrados().length }} registro(s)</span>
      </div>
      <button type="button" class="btn btn-brand" data-bs-toggle="modal" data-bs-target="#modalCadastro">
        <i class="bi bi-plus-lg me-1"></i>Cadastrar {{ singular() }}
      </button>
    </div>

    <div class="panel">
      <input #campo type="search" class="form-control mb-3" placeholder="Pesquisar..." (input)="busca.set(campo.value)">
      <div class="table-responsive">
        <table class="table align-middle mb-0">
          <thead>
            <tr>
              @for (coluna of colunas(); track coluna) {
                <th>{{ coluna }}</th>
              }
              <th class="text-end">Ações</th>
            </tr>
          </thead>
          <tbody>
            @for (linha of filtrados(); track linha) {
              <tr>
                @for (valor of linha; track $index) {
                  <td>{{ valor }}</td>
                }
                <td class="text-end">
                  <button type="button" class="btn btn-sm btn-outline-danger" aria-label="Excluir" (click)="remover(linha)">
                    <i class="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            } @empty {
              <tr>
                <td class="text-center text-muted-fo" [attr.colspan]="colunas().length + 1">Nenhum registro encontrado.</td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </div>

    <div class="modal fade" id="modalCadastro" tabindex="-1">
      <div class="modal-dialog">
        <form #form="ngForm" class="modal-content" (ngSubmit)="salvar(form)">
          <div class="modal-header">
            <h2 class="modal-title fs-5">Cadastrar {{ singular() }}</h2>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
          </div>
          <div class="modal-body">
            @for (coluna of colunas(); track coluna) {
              <label class="form-label d-block mb-3">
                {{ coluna }}
                <input class="form-control mt-1" [name]="coluna" ngModel required>
              </label>
            }
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Cancelar</button>
            <button type="submit" class="btn btn-brand" data-bs-dismiss="modal" [disabled]="form.invalid">Salvar</button>
          </div>
        </form>
      </div>
    </div>
  `,
})
export class Cadastro {
  private readonly dados = inject(Dados);

  readonly tipo = input.required<'clientes' | 'locais' | 'equipamentos' | 'modelos'>();
  readonly titulo = input.required<string>();
  readonly singular = input.required<string>();
  readonly colunas = input.required<string[]>();

  protected readonly busca = signal('');

  protected readonly filtrados = computed(() => {
    const termo = this.busca().toLowerCase();
    return this.dados[this.tipo()]().filter((linha) => linha.join(' ').toLowerCase().includes(termo));
  });

  protected salvar(form: NgForm): void {
    if (form.invalid) return;
    const linha = this.colunas().map((coluna) => String(form.value[coluna]));
    this.dados[this.tipo()].update((lista) => [...lista, linha]);
    form.resetForm();
  }

  protected remover(linha: string[]): void {
    this.dados[this.tipo()].update((lista) => lista.filter((item) => item !== linha));
  }
}

@Component({
  selector: 'app-clientes',
  imports: [Cadastro],
  template: `
    <app-cadastro tipo="clientes" titulo="Clientes" singular="cliente"
      [colunas]="['Nome', 'CNPJ', 'Cidade', 'Contato']" />
  `,
})
export class Clientes {}

@Component({
  selector: 'app-locais',
  imports: [Cadastro],
  template: `
    <app-cadastro tipo="locais" titulo="Locais de inspeção" singular="local"
      [colunas]="['Local', 'Cliente', 'Endereço', 'Responsável']" />
  `,
})
export class Locais {}

@Component({
  selector: 'app-equipamentos',
  imports: [Cadastro],
  template: `
    <app-cadastro tipo="equipamentos" titulo="Equipamentos" singular="equipamento"
      [colunas]="['Código', 'Equipamento', 'Tipo', 'Local']" />
  `,
})
export class Equipamentos {}

@Component({
  selector: 'app-modelos-checklist',
  imports: [Cadastro],
  template: `
    <app-cadastro tipo="modelos" titulo="Modelos de checklist" singular="modelo"
      [colunas]="['Modelo', 'Categoria', 'Itens', 'Versão']" />
  `,
})
export class ModelosChecklist {}
