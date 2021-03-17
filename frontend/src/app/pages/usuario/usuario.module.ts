import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsuarioPageRoutingModule } from './usuario-routing.module';

import { UsuarioPage } from './usuario.page';
import { AlterarSenhaComponent } from './alterar-senha/alterar-senha.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsuarioPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [UsuarioPage, AlterarSenhaComponent],
})
export class UsuarioPageModule {}
