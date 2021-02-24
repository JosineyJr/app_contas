import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {NavController} from '@ionic/angular';
@Component({
  selector: 'app-conta',
  templateUrl: './conta.page.html',
  styleUrls: ['./conta.page.scss'],
})
export class ContaPage implements OnInit {
  currentMonth = 50;
  lastMonth = 100;
  private sizeCircle = 725;
  contas: any;
  contasUsuario: any = [];
  usuario = {
    userName: null,
    email: null,
    password: null,
  };

  constructor(protected titleService: Title, protected navController: NavController) {
    this.titleService.setTitle('Minha Conta');
  }

  getPercentage() {
    const percentage = (this.currentMonth * 100) / this.lastMonth / 100;
    console.log(percentage);
    return percentage;
  }

  setStroke() {
    return this.sizeCircle + this.sizeCircle * this.getPercentage();
  }

  arredondar(value) {
    return Math.floor(value);
  }

  ngOnInit() {
    if(JSON.parse(localStorage.getItem('loginBD'))){
      this.usuario = JSON.parse(localStorage.getItem('loginBD'));
      this.contas = JSON.parse(localStorage.getItem('contaBD'));
      this.verificarContas();
    }else{
      this.navController.navigateBack("/login");
    }
  }

  verificarContas(){
    for(var i = 0; i < this.contas.length; i++){
      if(this.contas[i].usuario.userName === this.usuario.userName){
        this.contasUsuario.push(this.contas[i]);
      }
    }
  }
}
