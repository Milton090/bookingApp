import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment/environment';
import { ServiceI } from '../interfaces/service.interface';
import { ResponseI } from '../interfaces/response.interface';


@Injectable({
  providedIn: 'root'
})

export class ServiceService {

  private url!: string;

  constructor(private http: HttpClient) {
    this.url = environment.urlApi + environment.serviceController;
  }

  getAll() {
    return this.http.get<ResponseI>(`${this.url}`);
  }


  create(service: ServiceI) {
    return this.http.post<ResponseI>(`${this.url}`, service);
  }

   update(service: ServiceI) {
      return this.http.put<ResponseI>(`${this.url}/${service.id}`, service);
   }

   delete(id: number) {
      return this.http.delete<ResponseI>(`${this.url}/${id}`);
   }

}
