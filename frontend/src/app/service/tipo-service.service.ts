import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Tipo } from '../interfaces/Tipo.interface';

@Injectable({
  providedIn: 'root',
})
export class TipoServiceService {
  private API = 'http://localhost:8080/public/tipos/';

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  getTipos() {
    return this.http.get(this.API).toPromise();
  }

  getTipo(id: number) {
    let urlAuxiliar = this.API + id;
    return this.http.get(urlAuxiliar).toPromise();
  }

  postTipo(tipo: Tipo) {
    if (tipo.id == null) {
      return this.http
        .post(this.API, JSON.stringify(tipo), this.httpOptions)
        .toPromise();
    }
    return this.http
      .put(this.API, JSON.stringify(tipo), this.httpOptions)
      .toPromise();
  }

  deleteTipo(id: number) {
    let urlAuxiliar = this.API + id;
    return this.http.delete(urlAuxiliar).toPromise();
  }
}
