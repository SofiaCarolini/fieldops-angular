import { Injectable, signal } from '@angular/core';

export type Status = 'Agendada' | 'Em andamento' | 'Concluída' | 'Aprovada' | 'Reprovada';

export interface Inspecao {
  id: number;
  equipamento: string;
  cliente: string;
  tecnico: string;
  data: string;
  status: Status;
  progresso: number;
}

export const STATUS: Status[] = ['Agendada', 'Em andamento', 'Concluída', 'Aprovada', 'Reprovada'];

export const CORES: Record<Status, string> = {
  Agendada: 'text-bg-secondary',
  'Em andamento': 'text-bg-primary',
  Concluída: 'text-bg-warning',
  Aprovada: 'text-bg-success',
  Reprovada: 'text-bg-danger',
};

// Dados fictícios compartilhados entre as telas (não há backend).
@Injectable({ providedIn: 'root' })
export class Dados {
  // Nome, CNPJ, Cidade, Contato
  readonly clientes = signal<string[][]>([
    ['Indústria Alfa', '11.111.111/0001-11', 'Curitiba', 'Marina Lopes'],
    ['Hospital Vida', '22.222.222/0001-22', 'Londrina', 'Carlos Menezes'],
    ['Mercado Central', '33.333.333/0001-33', 'Maringá', 'Paula Ribeiro'],
  ]);

  // Local, Cliente, Endereço, Responsável
  readonly locais = signal<string[][]>([
    ['Fábrica Norte', 'Indústria Alfa', 'Rua das Máquinas, 100', 'Rafael Souza'],
    ['Galpão de Estoque', 'Indústria Alfa', 'Av. Industrial, 250', 'Bruna Alves'],
    ['Bloco Cirúrgico', 'Hospital Vida', 'Rua da Saúde, 45', 'Diego Martins'],
    ['Loja Matriz', 'Mercado Central', 'Praça Central, 12', 'Fernanda Dias'],
  ]);

  // Código, Equipamento, Tipo, Local
  readonly equipamentos = signal<string[][]>([
    ['EQ-001', 'Compressor de ar', 'Pneumático', 'Fábrica Norte'],
    ['EQ-002', 'Painel elétrico', 'Elétrico', 'Galpão de Estoque'],
    ['EQ-003', 'Gerador de emergência', 'Elétrico', 'Bloco Cirúrgico'],
    ['EQ-004', 'Câmara fria', 'Refrigeração', 'Loja Matriz'],
  ]);

  // Modelo, Categoria, Itens, Versão
  readonly modelos = signal<string[][]>([
    ['Inspeção elétrica', 'Elétrico', '12', 'v2'],
    ['Inspeção de compressores', 'Pneumático', '9', 'v1'],
    ['Inspeção de refrigeração', 'Refrigeração', '10', 'v3'],
  ]);

  readonly inspecoes = signal<Inspecao[]>([
    { id: 1049, equipamento: 'Gerador de emergência', cliente: 'Hospital Vida', tecnico: 'João Pereira', data: '27/11/2026', status: 'Agendada', progresso: 0 },
    { id: 1048, equipamento: 'Compressor de ar', cliente: 'Indústria Alfa', tecnico: 'Lucas Lima', data: '24/11/2026', status: 'Concluída', progresso: 100 },
    { id: 1047, equipamento: 'Painel elétrico', cliente: 'Indústria Alfa', tecnico: 'Ana Costa', data: '24/11/2026', status: 'Em andamento', progresso: 60 },
    { id: 1046, equipamento: 'Gerador de emergência', cliente: 'Hospital Vida', tecnico: 'João Pereira', data: '23/11/2026', status: 'Aprovada', progresso: 100 },
    { id: 1045, equipamento: 'Câmara fria', cliente: 'Mercado Central', tecnico: 'Ana Costa', data: '20/11/2026', status: 'Reprovada', progresso: 100 },
  ]);

  atualizarStatus(id: number, status: Status): void {
    this.inspecoes.update((lista) => lista.map((i) => (i.id === id ? { ...i, status } : i)));
  }
}
