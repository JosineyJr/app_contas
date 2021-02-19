import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.page.html',
  styleUrls: ['./usuario.page.scss'],
})
export class UsuarioPage implements OnInit {
  usuario = {
    userName: null,
    email: null,
    password: null,
  };

  constructor(protected titleService: Title) {
  }

  ngOnInit() {
    this.usuario = JSON.parse(localStorage.getItem('loginBD'));
    this.titleService.setTitle(this.usuario.userName);
  }
}
