import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  private backendUrl = 'http://localhost:3000'; 

  authenticateUser(username: string, password: string) {
    const data = { username, password };
    return this.http.post(`${this.backendUrl}/users/login`, data);
  }

}


