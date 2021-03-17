import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavController } from '@ionic/angular';
import { Usuario } from 'src/app/interfaces/Usuario.interface';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.page.html',
  styleUrls: ['./usuario.page.scss'],
})
export class UsuarioPage implements OnInit {
  usuario: Usuario;

  constructor(
    protected titleService: Title,
    protected navController: NavController,
  ) {}

  ngOnInit() {
    if (JSON.parse(localStorage.getItem('loginBD'))) {
      this.usuario = JSON.parse(localStorage.getItem('loginBD'));
    } else {
      this.navController.navigateBack('/login');
    }
    this.titleService.setTitle(this.usuario.email);
  }
}
