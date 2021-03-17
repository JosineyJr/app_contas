import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { Usuario } from 'src/app/interfaces/Usuario.interface';
import { UsuarioServiceService } from 'src/app/service/usuario-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  usuario: Usuario = {
    id: null,
    nome: null,
    email: null,
    senha: null,
  };

  usuarios: Usuario;

  pessoas: any = [];
  pessoa = {
    userName: null,
    email: null,
    password: null,
  };

  signup = new FormGroup({
    userName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
  });

  constructor(
    protected titleService: Title,
    private activatedRoute: ActivatedRoute,
    private navController: NavController,
    private toastController: ToastController,
    private usuarioService: UsuarioServiceService,
  ) {
    this.titleService.setTitle('Sign Up');
  }

  ngOnInit() {
    this.getUsuarios();
    // this.pessoas = JSON.parse(localStorage.getItem('usuarioBD'));
    // if (!this.pessoas) {
    //   this.pessoas = [];
    //   localStorage.setItem('usuarioBD', JSON.stringify(this.pessoas));
    // }

    // this.signup.get('userName').setValue(this.pessoa.userName);
    // this.signup.get('email').setValue(this.pessoa.email);
    // this.signup.get('password').setValue(this.pessoa.password);
  }

  async getUsuarios() {
    await this.usuarioService.getUsuarios().then(json => {
      this.usuarios = <Usuario>json;
    });
  }

  async submit() {
    this.usuario.email = this.signup.value.email;
    this.usuario.nome = this.signup.value.userName;
    this.usuario.senha = this.signup.value.password;
    console.log(this.usuario);

    await this.usuarioService.postUsuario(this.usuario).then(json => {
      if (json) {
        this.exibirMensagem('Usuario cadastrado com sucesso!');
        this.navController.navigateBack('/login');
      }
    });
    // this.pessoa.userName = this.signup.value.userName;
    // this.pessoa.email = this.signup.value.email;
    // this.pessoa.password = this.signup.value.password;

    // this.pessoas = JSON.parse(localStorage.getItem('usuarioBD'));

    // this.pessoas.push(this.pessoa);

    // localStorage.setItem('usuarioBD', JSON.stringify(this.pessoas));
    // this.exibirMensagem('Usuário cadastrado!!!');

    // this.navController.navigateBack('/login');
    // window.location.href = window.location.href.replace('register', 'login');
  }

  verificarUsuario(username: any): boolean {
    // this.usuario.email = this.signup.value.email;
    // this.usuario.nome = this.signup.value.userName;
    // this.usuario.senha = this.signup.value.assword;

    // console.log(username);
    for (const user in this.usuarios) {
      // console.log(this.usuarios[user]);
      if (this.usuarios[user].nome === username) {
        return true;
      }
    }
    return false;
    // //pegando os dados do banco
    // this.pessoas = JSON.parse(localStorage.getItem('usuarioBD'));

    // for (var i = 0; i < this.pessoas.length; i++) {
    //   if (userName === this.pessoas[i].userName) {
    //     return true;
    //   }
    // }

    // return false;
  }
  verificarEmail(email: any): boolean {
    for (const user in this.usuarios) {
      if (this.usuarios[user].email === email) {
        return true;
      }
    }
    return false;
    //pegando os dados do banco
    // this.pessoas = JSON.parse(localStorage.getItem('usuarioBD'));

    // console.log(email);

    // for (var i = 0; i < this.pessoas.length; i++) {
    //   if (email === this.pessoas[i].email) {
    //     return true;
    //   }
    // }

    // return false;
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
