import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsuarioPage } from './usuario.page';
import { AlterarSenhaComponent } from './alterar-senha/alterar-senha.component';

const routes: Routes = [
  {
    path: '',
    component: UsuarioPage,
  },
  {
    path: 'alterarSenha',
    component: AlterarSenhaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuarioPageRoutingModule {}
