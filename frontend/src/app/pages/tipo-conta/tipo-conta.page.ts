import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {NavController, AlertController} from '@ionic/angular';


@Component({
  selector: 'app-tipo-conta',
  templateUrl: './tipo-conta.page.html',
  styleUrls: ['./tipo-conta.page.scss'],
})
export class TipoContaPage implements OnInit {
  user: any;
  tiposContas: any = [];
  constructor(protected titleService: Title, protected navController: NavController, private alertController: AlertController) {
    this.titleService.setTitle('Tipo Contas');
  }

  ngOnInit() {
    if(JSON.parse(localStorage.getItem('loginBD'))){
      this.user = JSON.parse(localStorage.getItem('loginBD'));
    }else{
      this.navController.navigateBack("/login");
    }

    this.tiposContas = JSON.parse(localStorage.getItem('tipoBD'));
  }


  excluir(nome: string) {
    let conta: any[] = null;
    conta = this.tiposContas.filter((temp) => {
      return temp.nomeTipo === nome
    });
    this.confirmarExclusao(conta[0]);
  }

  async confirmarExclusao(tipo: any) {
    const alert = await this.alertController.create({
      header: 'Confirma a exclusão?',
      message: tipo.nomeTipo,
      buttons: [{
        text: 'Cancelar'
      }, {
        text: 'Confirmar',
        cssClass: 'danger',
        handler: () => {
          this.tiposContas = JSON.parse(localStorage.getItem('tipoBD'));
          this.tiposContas = this.tiposContas.filter((temp) => {
            return temp.nomeTipo != tipo.nomeTipo
          });
          localStorage.setItem('tipoBD', JSON.stringify(this.tiposContas));
          this.navController.navigateBack('/tipoConta');
          window.location.href = window.location.href;
          //this.exibirMensagem();
        }
      }]
    });
    await alert.present();
  }
}
