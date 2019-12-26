import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { UsuarioService } from "../services/service.index";
import { Usuario } from "../models/usuario.model";

declare function init_plugin();

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  recuerdame = false;
  email: string;
  constructor(
    private _router: Router,
    private _usuarioService: UsuarioService
  ) {}

  ngOnInit() {
    // Llamando custon.js
    init_plugin();
    this.email = localStorage.getItem("email") || "";
    if (this.email.length > 0) {
      this.recuerdame = true;
    }
  }

  ingresar(forma: NgForm) {
    if (forma.invalid) {
      return;
    }

    let usuario = new Usuario(null, forma.value.email, forma.value.password);
    this._usuarioService
      .login(usuario, forma.value.recuerdame)
      .subscribe(respuesta => this._router.navigate(["dashboard"]));
  }
}
