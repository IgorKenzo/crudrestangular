import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cliente } from '../model/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private httpClient : HttpClient) { }

  listar() : Observable<Cliente[]> {
    return this.httpClient.get<Cliente[]>(`${environment.apiEndpoint}/cliente`);
  }

  inserir(cli : Cliente): Observable<Cliente> {
    return this.httpClient.post<Cliente>(`${environment.apiEndpoint}/cliente`, cli);
  }

  delete(id: number) : Observable<any> {
    return this.httpClient.delete(`${environment.apiEndpoint}/cliente/${id}`);
  }

  update(cli: Cliente): Observable<Cliente> {
    return this.httpClient.put<Cliente>(`${environment.apiEndpoint}/cliente/${cli.id}`, cli)
  }
}
