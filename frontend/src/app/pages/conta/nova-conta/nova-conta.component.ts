import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { NavController, ToastController } from '@ionic/angular';
import { v4 as uuid } from 'uuid';
import { ActivatedRoute } from '@angular/router';
import { Conta } from '../../../interfaces/Conta.interface';
import { Tipo } from 'src/app/interfaces/Tipo.interface';
import { TipoServiceService } from 'src/app/service/tipo-service.service';
import { Usuario } from 'src/app/interfaces/Usuario.interface';
import { ContaServiceService } from 'src/app/service/conta-service.service';
import { UsuarioServiceService } from 'src/app/service/usuario-service.service';
import { jsonSchema } from 'uuidv4';

@Component({
  selector: 'app-nova-conta',
  templateUrl: './nova-conta.component.html',
  styleUrls: ['./nova-conta.component.scss'],
})
export class NovaContaComponent implements OnInit {
  alterar = false;

  usuario: Usuario;
  usuarios: Usuario;
  uuid = null;
  tiposContas: Tipo;
  indice = null;
  contas: Conta;
  conta: Conta;
  contaForm = new FormGroup({
    descricao: new FormControl('', Validators.required),
    tipo: new FormControl('', Validators.required),
    valor: new FormControl('', [Validators.required, Validators.min(1)]),
    dataVencimento: new FormControl('', Validators.required),
    situacao: new FormControl('', Validators.required),
  });
  constructor(
    protected titleService: Title,
    protected navController: NavController,
    private toastController: ToastController,
    private activatedRoute: ActivatedRoute,
    private tiposContasService: TipoServiceService,
    private contaService: ContaServiceService,
    private usuarioService: UsuarioServiceService,
  ) {
    titleService.setTitle('Nova Conta');
  }

  ngOnInit() {
    this.getTipos();
    this.getContas();
    this.getUsuarios();
    // this.contas = JSON.parse(localStorage.getItem('contaBD'));

    // if (!this.contas) {
    //   this.contas = [];
    //   localStorage.setItem('contaBD', JSON.stringify(this.contas));
    // }

    if (JSON.parse(localStorage.getItem('loginBD'))) {
      this.usuario = JSON.parse(localStorage.getItem('loginBD'));
      // this.tiposContas = JSON.parse(localStorage.getItem('tipoBD'));
    } else {
      this.navController.navigateBack('/login');
    }
    this.activatedRoute.params.subscribe(param => {
      if (param['id']) {
        this.getConta(param['id']);
        this.alterar = true;
        // for(var i = 0; i < this.contas.length; i++){
        //   if(this.contas[i].id == param['id']){
        //     this.Iconta = this.contas[i];
        //     this.uuid = this.contas[i].id;
        //     this.indice = i;
        //   }
        // }
      }
    });

    // this.conta.get('descricao').setValue(this.Iconta.descricao);
    // this.conta.get('tipo').setValue(this.Iconta.tipo);
    // this.conta.get('valor').setValue(this.Iconta.valor);
    // this.conta.get('dataVencimento').setValue(this.Iconta.dataVencimento);
    // this.conta.get('situacao').setValue(this.Iconta.situacao);
  }

  async getTipos() {
    await this.tiposContasService.getTipos().then(json => {
      this.tiposContas = <Tipo>json;
    });
  }

  async getTipo(id: number): Promise<Tipo> {
    return await this.tiposContasService.getTipo(id).then(json => {
      return <Tipo>json;
    });
  }

  async getContas() {
    await this.contaService.getContas().then(json => {
      this.contas = <Conta>json;
    });
  }

  async getConta(id: number) {
    await this.contaService.getConta(id).then(json => {
      this.conta = <Conta>json;
      console.log(JSON.stringify(this.conta));
      this.contaForm.get('descricao').setValue(this.conta.descricao);
      this.contaForm.get('tipo').setValue(this.conta.tipo.id);
      this.contaForm.get('valor').setValue(this.conta.valor);
      this.contaForm.get('dataVencimento').setValue(this.conta.dataVencimento);
      if (this.conta.situacao) {
        this.contaForm.get('situacao').setValue('1');
      } else {
        this.contaForm.get('situacao').setValue('0');
      }
    });
  }

  async getUsuarios() {
    await this.usuarioService.getUsuarios().then(json => {
      this.usuarios = <Usuario>json;
    });
  }

  async authenticateUsuario(email: string, senha: string): Promise<Usuario> {
    return await this.usuarioService
      .authenticateUsuario(email, senha)
      .then(json => {
        return <Usuario>json;
      });
  }

  async submit() {
    if (!this.alterar) {
      this.conta = {
        dataVencimento: new Date(this.contaForm.get('dataVencimento').value),
        id: null,
        descricao: this.contaForm.get('descricao').value,
        valor: Number.parseFloat(this.contaForm.get('valor').value),
        tipo: await this.getTipo(this.contaForm.get('tipo').value),
        usuario: await this.authenticateUsuario(
          this.usuario.email,
          this.usuario.senha,
        ),
        situacao: this.contaForm.get('situacao').value === 0,
      };
      console.log(JSON.stringify(this.conta));
      if (await this.contaService.postConta(this.conta)) {
        this.navController.navigateBack('/conta');
        window.location.href = window.location.href.replace('register', '');
        this.exibirMensagem('Conta cadastrada com sucesso!');
      } else {
        this.exibirMensagem('Erro ao cadastrar conta');
      }
    } else {
      this.conta.dataVencimento = new Date(
        this.contaForm.get('dataVencimento').value,
      );
      this.conta.descricao = this.contaForm.get('descricao').value;
      this.conta.valor = Number.parseFloat(this.contaForm.get('valor').value);
      this.conta.tipo = await this.getTipo(this.contaForm.get('tipo').value);
      this.conta.usuario = await this.authenticateUsuario(
        this.usuario.email,
        this.usuario.senha,
      );
      this.conta.situacao = this.contaForm.get('situacao').value === 0;
      console.log(JSON.stringify(this.conta));
      if (await this.contaService.postConta(this.conta)) {
        this.navController.navigateBack('/conta');
        window.location.href = window.location.href.replace('register', '');
        this.exibirMensagem('Conta alterada com sucesso!');
      } else {
        this.exibirMensagem('Erro ao alterar conta');
      }
    }
    // this.contas = JSON.parse(localStorage.getItem('contaBD'));
    // this.Iconta.descricao = this.conta.value.descricao;
    //   this.Iconta.tipo = this.conta.value.tipo;
    //   this.Iconta.valor = this.conta.value.valor;
    //   this.Iconta.dataVencimento = this.conta.value.dataVencimento;
    //   this.Iconta.situacao = this.conta.value.situacao;
    //   this.Iconta.usuario = this.usuario;
    // if(this.uuid){
    //   if(this.contas.find( conta => conta.id === this.uuid)){
    //     this.Iconta.id = this.uuid;
    //     this.contas[this.indice] = this.Iconta;
    //     this.exibirMensagem('Conta Editada!!!');
    //   }
    // }else{
    //   this.Iconta.id = uuid();
    //   this.contas.push(this.Iconta);
    //   this.exibirMensagem('Conta cadastrada!!!');
    // }
    // localStorage.setItem('contaBD', JSON.stringify(this.contas));
    // this.navController.navigateBack('/conta');
    // window.location.href = window.location.href.replace('register', '');
  }

  async exibirMensagem(mensagem: string) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 1500,
    });
    toast.present();
  }
}
