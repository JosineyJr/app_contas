import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../interfaces/Usuario.interface';

@Injectable({
  providedIn: 'root',
})
export class UsuarioServiceService {
  private API = 'http://localhost:8080/public/usuarios/';

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  getUsuarios() {
    return this.http.get(this.API).toPromise();
  }

  getUsuario(id: number) {
    let urlAuxiliar = this.API + id;
    return this.http.get(urlAuxiliar).toPromise();
  }

  authenticateUsuario(email: string, senha: string) {
    let urlAuxiliar = this.API + email + '/' + senha;
    return this.http.get(urlAuxiliar).toPromise();
  }

  postUsuario(usuario: Usuario) {
    if (usuario.id == null) {
      return this.http
        .post(this.API, JSON.stringify(usuario), this.httpOptions)
        .toPromise();
    }
    return this.http
      .put(this.API, JSON.stringify(usuario), this.httpOptions)
      .toPromise();
  }

  deleteUsuario(id: number) {
    let urlAuxiliar = this.API + id;
    return this.http.delete(urlAuxiliar).toPromise();
  }
}
