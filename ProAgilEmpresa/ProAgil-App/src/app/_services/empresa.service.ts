import { Empresa } from './../_models/Empresa';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

constructor(private http: HttpClient) {}

urlBase = 'http://localhost:5000/api/Empresa';


getAllEmpresa(): Observable<Empresa[]>  {
    return this.http.get<Empresa[]>(this.urlBase);
  }

  getByIdEmpresa(id: number): Observable<Empresa> {
    return this.http.get<Empresa>(`${this.urlBase}/${id}`);
  }

  getByNomeEmpresa(nome: string): Observable<Empresa[]> {
    return this.http.get<Empresa[]>(`${this.urlBase}/getByNome/${nome}`);
  }

  postEmpresa(empresa: Empresa) {
    return this.http.post(this.urlBase, empresa);
  }

  putEmpresa(empresa: Empresa) {
    return this.http.put(`${this.urlBase}/${empresa.id}`, empresa);
  }

  deleteEmpresa(id: number) {
    return this.http.delete(`${this.urlBase}/${id}`);
  }
}




