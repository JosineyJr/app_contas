import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  signup = new FormGroup({
    userName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  constructor(protected titleService: Title) {
    this.titleService.setTitle('Sign Up');
  }

  ngOnInit() {}

  enviou() {
    console.log('enviou');
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
