import { Routes } from '@angular/router';

import { Layout } from './layout/layout';
import { Acompanhamento } from './pages/acompanhamento/acompanhamento';
import { Clientes, Equipamentos, Locais, ModelosChecklist } from './pages/cadastros/cadastros';
import { Dashboard } from './pages/dashboard/dashboard';
import { Login } from './pages/login/login';
import { PlanejarInspecao } from './pages/planejar-inspecao/planejar-inspecao';
import { RevisaoInspecao } from './pages/revisao-inspecao/revisao-inspecao';

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: Login, title: 'Login | Field Ops' },
  {
    path: '',
    component: Layout,
    children: [
      { path: 'dashboard', component: Dashboard, title: 'Dashboard | Field Ops' },
      { path: 'clientes', component: Clientes, title: 'Clientes | Field Ops' },
      { path: 'locais', component: Locais, title: 'Locais | Field Ops' },
      { path: 'equipamentos', component: Equipamentos, title: 'Equipamentos | Field Ops' },
      { path: 'modelos-checklist', component: ModelosChecklist, title: 'Modelos | Field Ops' },
      { path: 'planejar', component: PlanejarInspecao, title: 'Planejar | Field Ops' },
      { path: 'acompanhamento', component: Acompanhamento, title: 'Acompanhamento | Field Ops' },
      { path: 'revisao', component: RevisaoInspecao, title: 'Revisão | Field Ops' },
      { path: 'revisao/:id', component: RevisaoInspecao, title: 'Revisão | Field Ops' },
    ],
  },
  { path: '**', redirectTo: '' },
];
