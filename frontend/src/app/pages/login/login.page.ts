import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';
import { UsuarioServiceService } from '../../service/usuario-service.service';
import { Usuario } from '../../interfaces/Usuario.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  usuario = {
    id: null,
    email: null,
    senha: null,
  };

  usuarios: Usuario;

  login = new FormGroup({
    email: new FormControl('', [Validators.required]),
    senha: new FormControl('', [Validators.required]),
  });

  constructor(
    protected titleService: Title,
    private navController: NavController,
    private toastController: ToastController,
    private usuarioService: UsuarioServiceService,
  ) {
    this.titleService.setTitle('Log in');
  }

  ngOnInit() {
    localStorage.setItem('loginBD', JSON.stringify(null));

    // this.pessoas = JSON.parse(localStorage.getItem('usuarioBD'));

    this.login.get('email').setValue(this.usuario.email);
    this.login.get('senha').setValue(this.usuario.senha);
  }

  async submit() {
    this.usuario.email = this.login.value.email;
    this.usuario.senha = this.login.value.senha;

    let controle = false;

    await this.usuarioService.getUsuarios().then(json => {
      this.usuarios = <Usuario>json;
      for (const usuario in this.usuarios) {
        if (
          this.usuarios[usuario].email === this.usuario.email &&
          this.usuarios[usuario].senha === this.usuario.senha
        ) {
          this.usuario.id = this.usuarios[usuario].id;
          localStorage.setItem('loginBD', JSON.stringify(this.usuario));
          this.navController.navigateBack('/principal');
          controle = true;
          this.exibirMensagem('Login realizado com sucesso!');
          window.location.href = window.location.href.replace(
            'login',
            'principal',
          );
        }
      }
    });

    if (!controle) {
      this.exibirMensagem('Usuario ou Senha Incorretos!!');
    }

    // for(var i = 0; i < this.pessoas.length; i++){
    //   if(this.pessoas[i].userName === this.usuario.userName && this.pessoas[i].password === this.usuario.password){
    //     localStorage.setItem('loginBD', JSON.stringify(this.pessoas[i]));
    //     this.navController.navigateBack('/principal');
    //     controle = true;
    //     window.location.href = window.location.href.replace('login', 'principal');
    //   }
    // }
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
