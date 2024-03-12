
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = "";
  password: string = "";
  newUser: { username: string, password: string } = { username: '', password: '' };
  mensajeLogin: string = "";

  constructor(private router: Router, private loginService: LoginService) {}

  btnLogin(): void {
    const inputUsername = this.username;
    const inputPassword = this.password;

    this.loginService.authenticateUser(inputUsername, inputPassword).subscribe(
      (response: any) => {
        if (response.message === "Inicio de sesión exitoso") {
          this.mensajeLogin = response.message;
          this.router.navigate(["inicio"]);
        } else {
          this.mensajeLogin = "Usuario o contraseña incorrecto";
        }
      },
      (error) => {
        this.mensajeLogin = "Error al iniciar sesión"; 
      }
    );
  }

  limpiarCampos(): void {
    this.username = "";
    this.password = "";
    this.mensajeLogin = "";
  }

  
}
