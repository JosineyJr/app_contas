import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {
  NavController,
  AlertController,
  ToastController,
} from '@ionic/angular';
import { TipoServiceService } from 'src/app/service/tipo-service.service';
import { Tipo } from '../../interfaces/Tipo.interface';

@Component({
  selector: 'app-tipo-conta',
  templateUrl: './tipo-conta.page.html',
  styleUrls: ['./tipo-conta.page.scss'],
})
export class TipoContaPage implements OnInit {
  user: any;
  tiposContas: Tipo;
  constructor(
    protected titleService: Title,
    protected navController: NavController,
    private alertController: AlertController,
    protected toastController: ToastController,
    private tipoContaService: TipoServiceService,
  ) {
    this.titleService.setTitle('Tipo Contas');
  }

  ngOnInit() {
    if (JSON.parse(localStorage.getItem('loginBD'))) {
      this.user = JSON.parse(localStorage.getItem('loginBD'));
    } else {
      this.navController.navigateBack('/login');
    }

    this.getTipos();
  }

  async getTipos() {
    await this.tipoContaService.getTipos().then(json => {
      this.tiposContas = <Tipo>json;
    });
  }

  excluir(id: number) {
    // let conta: any[] = null;
    let Tconta: Tipo;
    for (const index in this.tiposContas) {
      if (id === this.tiposContas[index].id) {
        Tconta = this.tiposContas[index];
      }
    }
    this.confirmarExclusao(Tconta);
  }

  async confirmarExclusao(tipo: Tipo) {
    console.log('foi');
    const alert = await this.alertController.create({
      header: 'Confirma a exclusão?',
      message: tipo.nome,
      buttons: [
        {
          text: 'Cancelar',
        },
        {
          text: 'Confirmar',
          cssClass: 'danger',
          handler: () => {
            if (this.tipoContaService.deleteTipo(tipo.id)) {
              // this.navController.navigateBack('/tipoConta');
              window.location.href = window.location.href;
              this.exibirMensagem('TIpo excluido com sucesso!');
            }
            // this.tiposContas = JSON.parse(localStorage.getItem('tipoBD'));
            // this.tiposContas = this.tiposContas.filter(temp => {
            //   return temp.nomeTipo != tipo.nomeTipo;
            // });
            // localStorage.setItem('tipoBD', JSON.stringify(this.tiposContas));
            // this.navController.navigateBack('/tipoConta');
            // window.location.href = window.location.href;
            // //this.exibirMensagem();
          },
        },
      ],
    });
    await alert.present();
  }

  async exibirMensagem(mensagem: string) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 1500,
    });
    toast.present();
  }
}
