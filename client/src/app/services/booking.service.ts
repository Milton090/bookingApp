import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment/environment';
import { ResponseI } from '../interfaces/response.interface';
import { BookingI } from '../interfaces/booking.interface';


@Injectable({
  providedIn: 'root'
})

export class BookingService {

  private url!: string;

  constructor(private http: HttpClient) {
    this.url = environment.urlApi + environment.bookingController;
  }

  getAll() {
    return this.http.get<ResponseI>(`${this.url}`);
  }


  create(booking: BookingI) {
    return this.http.post<ResponseI>(`${this.url}`, booking);
  }

  update(booking: BookingI) {
    return this.http.put<ResponseI>(`${this.url}/${booking.id}`, booking);
  }

  delete(id: number) {
    return this.http.delete<ResponseI>(`${this.url}/${id}`);
  }

}
