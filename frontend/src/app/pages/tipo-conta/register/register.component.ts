import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { NavController, ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Tipo } from 'src/app/interfaces/Tipo.interface';
import { TipoServiceService } from 'src/app/service/tipo-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  alterar = false;

  user: any;
  tipos: Tipo;

  tipo: Tipo;
  indice = null;

  tipoConta = new FormGroup({
    tipo: new FormControl('', [Validators.required, Validators.minLength(5)]),
  });
  constructor(
    protected titleService: Title,
    private activatedRoute: ActivatedRoute,
    protected navController: NavController,
    private tipoContaService: TipoServiceService,
    protected toastController: ToastController,
  ) {
    this.titleService.setTitle('Novo Tipo Conta');
  }

  ngOnInit() {
    this.getTipos();
    // if (JSON.parse(localStorage.getItem('loginBD'))) {
    //   this.user = JSON.parse(localStorage.getItem('loginBD'));
    // } else {
    //   this.navController.navigateBack('/login');
    // }

    // this.tipos = JSON.parse(localStorage.getItem('tipoBD'));
    // if (!this.tipos) {
    //   // this.tipos = Tipo[];
    //   localStorage.setItem('tipoBD', JSON.stringify(this.tipos));
    // }

    this.activatedRoute.params.subscribe(param => {
      if (param['id']) {
        this.tipoContaService.getTipo(param['id']).then(json => {
          this.tipo = <Tipo>json;
          this.tipoConta.get('tipo').setValue(this.tipo.nome);
          this.alterar = true;
        });
      }
    });

    // this.tipoConta.get('tipo').setValue(this.tipo.nome);
  }

  async getTipos() {
    await this.tipoContaService.getTipos().then(json => {
      this.tipos = <Tipo>json;
    });
  }

  async salvarTipo() {
    if (!this.alterar) {
      console.log('aui');
      this.tipo = {
        id: null,
        nome: this.tipoConta.get('tipo').value,
      };
    } else {
      this.tipo.nome = this.tipoConta.get('tipo').value;
    }
    if (await this.tipoContaService.postTipo(this.tipo)) {
      this.navController.navigateBack('/tipoConta');
      window.location.href = window.location.href.replace('register', '');
    } else {
      console.log('shit');
    }
    // this.tipos = JSON.parse(localStorage.getItem('tipoBD'));
    // this.tipo.nome = this.tipoConta.value.tipo;
    // if (this.indice !== null) {
    //   this.tipos[this.indice] = this.tipo;
    //   this.exibirMensagem('Tipo de conta editado!!!');
    // } else {
    //   this.tipos.push(this.tipo);
    //   this.exibirMensagem('Tipo de conta cadastrado!!!');
    // }
    // localStorage.setItem('tipoBD', JSON.stringify(this.tipos));
    // this.navController.navigateBack('/tipoConta');
    // window.location.href = window.location.href.replace('register', '');
  }

  async exibirMensagem(mensagem: string) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 1500,
    });
    toast.present();
  }

  verificarTipo(nomeTipo: string | number) {
    for (const index in this.tipos) {
      if (nomeTipo === this.tipos[index].nome) {
        return true;
      }
    }
    return false;
    // this.tipos = JSON.parse(localStorage.getItem('tipoBD'));
    // for (var i = 0; i < this.tipos.length; i++) {
    //   if (this.tipos[i].nomeTipo === tipo) {
    //     return true;
    //   }
    // }
    // return false;
  }
}
