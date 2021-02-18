import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-conta',
  templateUrl: './conta.page.html',
  styleUrls: ['./conta.page.scss'],
})
export class ContaPage implements OnInit {
  currentMonth = 50;
  lastMonth = 100;
  private sizeCircle = 725;
  usuario = {
    userName: null,
    email: null,
    password: null,
  };

  constructor(protected titleService: Title) {
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
    this.usuario = JSON.parse(localStorage.getItem('loginBD'));
  }
}
