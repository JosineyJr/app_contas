import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Conta } from '../interfaces/Conta.interface';

@Injectable({
  providedIn: 'root',
})
export class ContaServiceService {
  private API = 'http://localhost:8080/public/contas/';

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  getContas() {
    return this.http.get(this.API).toPromise();
  }

  getConta(id: number) {
    let urlAuxiliar = this.API + id;
    return this.http.get(urlAuxiliar).toPromise();
  }

  postConta(conta: Conta) {
    if (conta.id == null) {
      return this.http
        .post(this.API, JSON.stringify(conta), this.httpOptions)
        .toPromise();
    }
    return this.http
      .put(this.API, JSON.stringify(conta), this.httpOptions)
      .toPromise();
  }

  deleteConta(id: number) {
    let urlAuxiliar = this.API + id;
    return this.http.delete(urlAuxiliar).toPromise();
  }
}
