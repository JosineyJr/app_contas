import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-tipo-conta',
  templateUrl: './tipo-conta.page.html',
  styleUrls: ['./tipo-conta.page.scss'],
})
export class TipoContaPage implements OnInit {
  constructor(protected titleService: Title) {
    this.titleService.setTitle('Tipo Contas');
  }

  ngOnInit() {}
}
