import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment/environment';
import { UserI } from '../interfaces/user.interface';
import { ResponseI } from '../interfaces/response.interface';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private url!: string;

  constructor(private http: HttpClient) {
    this.url = environment.apiUrl + environment.authController;
  }

  login(user: UserI) {
    return this.http.post<ResponseI>(this.url + '/login', user);
  }

  register(user: UserI) {
    return this.http.post<ResponseI>(this.url + '/register', user);
  }
}
