import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  private backendUrl = 'http://localhost:3000'; 

  constructor(private http: HttpClient) { }

  crearUsuario(newUserData: any) {
    // Solicitud POST al endpoint del servidor 
    return this.http.post(`${this.backendUrl}/users`, newUserData);
  }
}
