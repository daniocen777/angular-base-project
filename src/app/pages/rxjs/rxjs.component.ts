import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";

@Component({
  selector: "app-rxjs",
  templateUrl: "./rxjs.component.html",
  styles: []
})
export class RxjsComponent implements OnInit {
  constructor() {
    // Para escuchar, se necesit suscribir
    // retry(2) => intentar 2 veces
    this.regresaObservable()
      .retry(2)
      .subscribe(
        numero => console.log("Subcripción:", numero),
        (error: any) => console.log("Error en la subcripción:", error),
        () => console.log("Terminó el observador")
      );
  }

  ngOnInit() {}

  regresaObservable(): Observable<number> {
    let obs: Observable<number> = new Observable(observer => {
      let contador = 0;
      let intervalo = setInterval(() => {
        contador += 1;
        // Notifica cada vez que venga info
        observer.next(contador); // Notidica 1, 2, 3, 4...
        if (contador === 3) {
          clearInterval(intervalo);
          observer.complete();
        }

        if (contador === 2) {
          /* clearInterval(intervalo); */
          observer.error("Errorrrr");
        }
      }, 1000);
    });

    return obs;
  }
}
