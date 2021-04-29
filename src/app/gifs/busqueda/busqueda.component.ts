import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent {

  //Recoge el valor del input con identificador txtBuscar. dispara el metodo buscar cuendo se levanta la tecla enter
  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;

  constructor( private gifsService: GifsService ){}
  
  buscar() {

    const valor = this.txtBuscar.nativeElement.value;

    //Se valida el campo
    if ( valor.trim().length === 0 ) return; 

    //Añade el valor al array que alamcena el historial-busqueda y que esta en el servicio
    this.gifsService.buscarGifs( valor );

    //Se vacia el input
    this.txtBuscar.nativeElement.value = '';
  }
}
