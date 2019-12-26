import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { UsuarioService } from "../usuario/usuario.service";

@Injectable()
export class LoginGuardGuard implements CanActivate {
  constructor(
    private _usuarioService: UsuarioService,
    private _router: Router
  ) {}
  canActivate(): boolean {
    if (this._usuarioService.estaLogueado()) {
      console.log("Pasó el guardían");
      return true;
    } else {
      console.log("NO Pasó el guardían");
      this._router.navigate(["/login"]);
      return false;
    }
  }
}
