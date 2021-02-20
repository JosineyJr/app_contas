import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-nova-conta',
  templateUrl: './nova-conta.component.html',
  styleUrls: ['./nova-conta.component.scss'],
})
export class NovaContaComponent implements OnInit {
  constructor(protected titleService: Title) {
    titleService.setTitle('Nova Conta');
  }

  ngOnInit() {}
}
