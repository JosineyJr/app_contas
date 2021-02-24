import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import {NavController, ToastController} from '@ionic/angular';

@Component({
  selector: 'app-nova-conta',
  templateUrl: './nova-conta.component.html',
  styleUrls: ['./nova-conta.component.scss'],
})
export class NovaContaComponent implements OnInit {
  usuario: any;
  tiposContas: any;
  contas: any = [];
  Iconta = {
    descricao: null,
    tipo: null,
    valor: null,
    dataVencimento: null,
    situacao: null,
    usuario: null
  };
  conta = new FormGroup({
    descricao: new FormControl('', Validators.required),
    tipo: new FormControl('', Validators.required),
    valor: new FormControl('', [Validators.required, Validators.min(1)]),
    dataVencimento: new FormControl('', Validators.required),
    situacao: new FormControl('', Validators.required),
  });
  constructor(protected titleService: Title, protected navController: NavController, private toastController: ToastController) {
    titleService.setTitle('Nova Conta');
  }

  ngOnInit() {

    this.contas =  JSON.parse(localStorage.getItem('contaBD'));

    if(!this.contas){
      this.contas = [];
      localStorage.setItem('contaBD', JSON.stringify(this.contas));
    }

    if(JSON.parse(localStorage.getItem('loginBD'))){
      this.usuario = JSON.parse(localStorage.getItem('loginBD'));
      this.tiposContas = JSON.parse(localStorage.getItem('tipoBD'));
    }else{
      this.navController.navigateBack("/login");
    }

    this.conta.get('descricao').setValue(this.Iconta.descricao);
    this.conta.get('tipo').setValue(this.Iconta.tipo);
    this.conta.get('valor').setValue(this.Iconta.valor);
    this.conta.get('dataVencimento').setValue(this.Iconta.dataVencimento);
    this.conta.get('situacao').setValue(this.Iconta.situacao);
  }

  enviou() {
    this.Iconta.descricao = this.conta.value.descricao;
    this.Iconta.tipo = this.conta.value.tipo;
    this.Iconta.valor = this.conta.value.valor;
    this.Iconta.dataVencimento = this.conta.value.dataVencimento;
    this.Iconta.situacao = this.conta.value.situacao;
    this.Iconta.usuario = this.usuario;

    this.contas =  JSON.parse(localStorage.getItem('contaBD'));

    this.contas.push(this.Iconta);

    localStorage.setItem('contaBD', JSON.stringify(this.contas));

    this.exibirMensagem('Conta cadastrada!!!');

    this.navController.navigateBack('/conta');
    window.location.href = window.location.href.replace('register', '');
  }

  async exibirMensagem(mensagem: string) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 1500
    });
    toast.present();
  }
}
