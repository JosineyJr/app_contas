import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TipoContaPageRoutingModule } from './tipo-conta-routing.module';

import { TipoContaPage } from './tipo-conta.page';
import { RegisterComponent } from './register/register.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, TipoContaPageRoutingModule],
  declarations: [TipoContaPage, RegisterComponent],
})
export class TipoContaPageModule {}
