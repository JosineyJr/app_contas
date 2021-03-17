import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { NavController, ToastController } from '@ionic/angular';
import { Usuario } from 'src/app/interfaces/Usuario.interface';
import { UsuarioServiceService } from 'src/app/service/usuario-service.service';

@Component({
  selector: 'app-alterar-senha',
  templateUrl: './alterar-senha.component.html',
  styleUrls: ['./alterar-senha.component.scss'],
})
export class AlterarSenhaComponent implements OnInit {
  usuario: Usuario;
  alterarForm = new FormGroup({
    novaSenha: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    confirmarNovaSenha: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
  });

  constructor(
    private titleService: Title,
    private usuarioService: UsuarioServiceService,
    protected navController: NavController,
    private toastController: ToastController,
  ) {
    titleService.setTitle('Alterar Senha');
  }

  async ngOnInit() {
    if (JSON.parse(localStorage.getItem('loginBD'))) {
      // this.usuario = JSON.parse(localStorage.getItem('loginBD'));
      await this.getUsuario(JSON.parse(localStorage.getItem('loginBD')).id);
      console.log(this.usuario);
    } else {
      this.navController.navigateBack('/login');
    }
  }

  verificarSenhas(): boolean {
    return (
      this.alterarForm.get('novaSenha').value ===
      this.alterarForm.get('confirmarNovaSenha').value
    );
  }

  async onSubmit() {
    this.usuario.senha = this.alterarForm.get('novaSenha').value;
    console.log(this.usuario);
    await this.usuarioService.postUsuario(this.usuario).then(json => {
      if (json) {
        this.exibirMensagem('Senha alterada com sucesso!');
        this.navController.navigateBack('/principal');
      }
    });
  }

  async getUsuario(id: number) {
    await this.usuarioService.getUsuario(id).then(json => {
      this.usuario = <Usuario>json;
    });
  }

  async exibirMensagem(mensagem: string) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 1500,
    });
    toast.present();
  }

  showPassword(input, text) {
    if (input.el.type === 'password') {
      text.style.width = '80px';
      text.style.left = '250px';
      text.innerText = 'Esconder';
      input.el.type = 'text';
    } else {
      text.style.width = '60px';
      text.style.left = '270px';
      text.innerText = 'Mostrar';
      input.el.type = 'password';
    }
    return true;
  }
}
