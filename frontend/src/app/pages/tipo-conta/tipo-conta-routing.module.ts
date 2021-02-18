import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TipoContaPage } from './tipo-conta.page';

const routes: Routes = [
  {
    path: '',
    component: TipoContaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TipoContaPageRoutingModule {}
