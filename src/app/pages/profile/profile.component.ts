import { Component, OnInit } from "@angular/core";
import { Usuario } from "../../models/usuario.model";
import { UsuarioService } from "../../services/service.index";

declare let alertify: any;

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {
  usuario: Usuario;
  imagenSubir: File;
  imagenTemporal: string;

  constructor(private _usuarioService: UsuarioService) {
    this.usuario = this._usuarioService.usuario;
  }

  ngOnInit() {}

  guardar(usuario: Usuario) {
    this.usuario.nombre = usuario.nombre;
    this.usuario.email = usuario.email;
    this._usuarioService.actualizarUsuario(this.usuario).subscribe(resp => {});
  }

  seleccionImage(archivo: File) {
    if (!archivo) {
      this.imagenSubir = null;
      return;
    }
    if (archivo.type.indexOf("image") < 0) {
      alertify
        .alert()
        .setting({
          label: "Aceptar",
          message: "Sólo se aceptan imágenes",
          onok: function() {
            alertify.warning("Error al subir imagen");
          }
        })
        .show();
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;
    let reader = new FileReader();
    let urlImagenTemporal = reader.readAsDataURL(archivo);
    reader.onloadend = () => (this.imagenTemporal = reader.result.toString());
  }

  enviarImagen() {
    this._usuarioService.cambiarImagen(this.imagenSubir, this.usuario._id);
  }
}
