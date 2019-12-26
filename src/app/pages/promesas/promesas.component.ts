import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-promesas",
  templateUrl: "./promesas.component.html",
  styles: []
})
export class PromesasComponent implements OnInit {
  constructor() {
    this.contarTres()
      .then(msj => console.log("Terminó", msj))
      .catch(error => {
        console.log("Error =>", error);
      });
  }

  ngOnInit() {}

  // Función que retorna una promesa
  contarTres(): Promise<boolean> {
    let promesa: Promise<boolean> = new Promise((resolve, reject) => {
      let contador = 0;
      let interval = setInterval(() => {
        contador += 1;
        console.log("Tiempo", contador);
        if (contador === 3) {
          resolve(true);
          //reject("Error");
          clearInterval(interval);
        }
      }, 1000);
    });

    return promesa;
  }
}
