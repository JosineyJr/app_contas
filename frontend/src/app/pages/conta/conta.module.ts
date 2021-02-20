import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContaPageRoutingModule } from './conta-routing.module';

import { ContaPage } from './conta.page';
import { NovaContaComponent } from './nova-conta/nova-conta.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ContaPageRoutingModule],
  declarations: [ContaPage, NovaContaComponent],
})
export class ContaPageModule {}
