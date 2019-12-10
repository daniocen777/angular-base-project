import { Component, OnInit, Inject } from "@angular/core";
import { SettingsService } from "../../services/service.index";

@Component({
  selector: "app-account-settings",
  templateUrl: "./account-settings.component.html",
  styles: []
})
export class AccountSettingsComponent implements OnInit {
  // Haciendo referencia al DOM (Inject)
  constructor(private _ajustes: SettingsService) {}

  ngOnInit() {
    this.colocarCheck();
  }

  cambiarColor(tema: string, link: any) {
    this.aplicarCheck(link);
    this._ajustes.aplicarTema(tema);
  }

  // Función que cambia el lugar del check al elegir el tema
  aplicarCheck(link: any) {
    // Barrer el dom de clase "selector"
    let selectorores: any = document.getElementsByClassName("selector");
    for (let ref of selectorores) {
      ref.classList.remove("working");
    }

    link.classList.add("working");
  }

  // Hacer que persista el check
  colocarCheck() {
    let selectorores: any = document.getElementsByClassName("selector");
    let tema = this._ajustes.ajustes.tema;
    for (let ref of selectorores) {
      if (ref.getAttribute("data-theme") == tema) {
        ref.classList.add("working");
        break;
      }
    }
  }
}
