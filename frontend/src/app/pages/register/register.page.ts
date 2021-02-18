import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  constructor() {}

  ngOnInit() {}
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
  }
}
