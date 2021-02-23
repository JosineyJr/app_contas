import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import {} from "@ionic/angular";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  tipoConta = new FormGroup({
    tipo: new FormControl('', Validators.required),
  });
  constructor(protected titleService: Title) {
    this.titleService.setTitle('Novo Tipo Conta');
  }

  ngOnInit() {}

  enviou() {

  }
}
