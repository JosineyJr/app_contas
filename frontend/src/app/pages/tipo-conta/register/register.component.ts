import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor(protected titleService: Title) {
    this.titleService.setTitle('Novo Tipo Conta');
  }

  ngOnInit() {}
}
