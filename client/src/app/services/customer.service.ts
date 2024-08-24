import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment/environment';
import { CustomerI } from '../interfaces/customer.interface';
import { ResponseI } from '../interfaces/response.interface';


@Injectable({
  providedIn: 'root'
})

export class CustomerService {

  private url!: string;

  constructor(private http: HttpClient) {
    this.url = environment.urlApi + environment.customerController;
  }

  getAll() {
    return this.http.get<ResponseI>(`${this.url}`);
  }


  create(customer: CustomerI) {
    return this.http.post<ResponseI>(`${this.url}`, customer);
  }

  update(customer: CustomerI) {
    return this.http.put<ResponseI>(`${this.url}/${customer.id}`, customer);
  }

  delete(id: number) {
    return this.http.delete<ResponseI>(`${this.url}/${id}`);
  }

}
