import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-nova-conta',
  templateUrl: './nova-conta.component.html',
  styleUrls: ['./nova-conta.component.scss'],
})
export class NovaContaComponent implements OnInit {
  conta = new FormGroup({
    descricao: new FormControl('', Validators.required),
    tipo: new FormControl('', Validators.required),
    valor: new FormControl('', [Validators.required, Validators.min(1)]),
    dataVencimento: new FormControl('', Validators.required),
    situacao: new FormControl('', Validators.required),
  });
  constructor(protected titleService: Title) {
    titleService.setTitle('Nova Conta');
  }

  ngOnInit() {}

  enviou() {
    console.log(this.conta);
  }
}
