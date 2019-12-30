import { Injectable } from "@angular/core";
import { Usuario } from "../../models/usuario.model";
import { HttpClient } from "@angular/common/http";
import { URL_SERVICIOS } from "../../config/config";
import { Observable } from "rxjs/Observable";

import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import { Router } from "@angular/router";
import { SubirArchivoService } from "../subir-archivo/subir-archivo.service";

declare let alertify: any;

@Injectable()
export class UsuarioService {
  usuario: Usuario;
  token: string;
  menu: any[] = [];
  constructor(
    private http: HttpClient,
    private router: Router,
    private _subirArchivoService: SubirArchivoService
  ) {
    this.cargarStorage();
  }

  cargarStorage() {
    if (localStorage.getItem("token")) {
      this.token = localStorage.getItem("token");
      this.usuario = JSON.parse(localStorage.getItem("usuario"));
      //this.menu = JSON.parse(localStorage.getItem("menu"));
    } else {
      this.token = "";
      this.usuario = null;
      //this.menu = [];
    }
  }

  estaLogueado() {
    return this.token.length > 5 ? true : false;
  }

  guardarStorage(id: string, token: string, usuario: Usuario) {
    localStorage.setItem("id", id);
    localStorage.setItem("token", token);
    localStorage.setItem("usuario", JSON.stringify(usuario));
    //localStorage.setItem("menu", JSON.stringify(menu));

    this.usuario = usuario;
    this.token = token;
    //this.menu = menu;
  }

  logout() {
    this.usuario = null;
    this.token = "";
    // this.menu = [];

    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    //localStorage.removeItem("menu");

    this.router.navigate(["/login"]);
  }

  login(usuario: Usuario, recordar: boolean = false) {
    if (recordar) {
      localStorage.setItem("email", usuario.email);
    } else {
      localStorage.removeItem("email");
    }

    let url = URL_SERVICIOS + "/login";
    return this.http
      .post(url, usuario)
      .map((resp: any) => {
        this.guardarStorage(resp.id, resp.token, resp.usuario);
        return true;
      })
      .catch(err => {
        alertify
          .alert()
          .setting({
            label: "Aceptar",
            message: err.error.mensaje,
            onok: function() {
              alertify.success("Ahora puede ingresar");
            }
          })
          .show();
        return Observable.throw(err);
      });
  }

  crearUsuario(usuario: Usuario) {
    let url = URL_SERVICIOS + "/usuario";
    return this.http.post(url, usuario).map((resp: any) => {
      //grab the dialog instance using its parameter-less constructor then set multiple settings at once.
      alertify
        .alert()
        .setting({
          label: "Aceptar",
          message: "El usaurio fue crear correctamente",
          onok: function() {
            alertify.success("Ahora puede ingresar");
          }
        })
        .show();
      return resp.usuario;
    });
  }

  actualizarUsuario(usuario: Usuario) {
    let url =
      URL_SERVICIOS + "/usuario/" + usuario._id + "?token=" + this.token;
    return this.http.put(url, usuario).map((resp: any) => {
      let usuarioDB: Usuario = resp.usuario;
      this.guardarStorage(usuarioDB._id, this.token, usuarioDB);
      alertify
        .alert()
        .setting({
          label: "Aceptar",
          message: "El usaurio fue actualizado correctamente",
          onok: function() {
            alertify.success("Usuario actualizado");
          }
        })
        .show();
      return true;
    });
  }

  cambiarImagen(file: File, id: string) {
    this._subirArchivoService
      .subirArchivo(file, "usuarios", id)
      .then((resp: any) => {
        this.usuario.img = resp.usuario.img;
        alertify
          .alert()
          .setting({
            label: "Aceptar",
            message: "Imagen actualizada correctamente",
            onok: function() {
              alertify.success("Imagen actualizada");
            }
          })
          .show();
        this.guardarStorage(id, this.token, this.usuario);
      })
      .catch(error => {
        console.log(error);
      });
  }
}
