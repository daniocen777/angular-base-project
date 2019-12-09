import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef
} from "@angular/core";

@Component({
  templateUrl: "./incrementador.component.html",
  selector: "app-incrementador",
  styles: []
})
export class IncrementadorComponent implements OnInit {
  @Input() leyenda: string = "Leyenda"; // Leyenda => Valor X defecto
  @Input() progreso: number = 50;
  @ViewChild("txtProgress") txtProgress: ElementRef; // Recibe un elemento html (#txtProgress)

  // Notificando al padre sobre el progreso
  @Output() cambioValor: EventEmitter<number> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  onChange(newValue: number) {
    if (newValue >= 100) {
      this.progreso = 100;
    } else if (newValue <= 0) {
      this.progreso = 0;
    } else {
      this.progreso = newValue;
    }

    this.txtProgress.nativeElement.value = this.progreso;

    this.cambioValor.emit(this.progreso);

    // Enfocando
    this.txtProgress.nativeElement.focus();
  }

  cambiarValor(valor: number) {
    if (this.progreso >= 100 && valor > 0) {
      this.progreso = 100;
      return;
    }
  
    if (this.progreso <= 0 && valor < 0) {
      this.progreso = 0;
      return;
    }
    this.progreso = this.progreso + valor;

    this.cambioValor.emit(this.progreso);
  }
}
