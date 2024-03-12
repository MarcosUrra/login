import { Component } from '@angular/core';
import { RegistroService } from './registro.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  newUser: { username: string, password: string } = { username: '', password: '' };
  mensajeRegistro: string = "";

  constructor(private registroService: RegistroService) {}

  registrarNuevoUsuario() {
    this.registroService.crearUsuario(this.newUser).subscribe(
      (response: any) => {
        console.log('Usuario creado:', response);
        this.mensajeRegistro = 'Usuario creado con éxito';
        
      },
      (error) => {
        console.error('Error al crear usuario', error);
        this.mensajeRegistro = 'Error al crear usuario';
        
      }
    );
  }
  
}
