import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private servicioURL: string = 'https://api.giphy.com/v1/gifs';
  private _historial: string[] = [];
  public resultados: Gif[] = [];

  get historial(){

    //Spread para devolver un nuevo array y conservar el array original
    return [...this._historial];
  }

  constructor( private http: HttpClient ){

    //Lee del localstorage y lo carga en el historial
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
    // if (localStorage.getItem('historial')){
    //   this._historial = JSON.parse(localStorage.getItem('historial')!);
    // }
  }

  buscarGifs ( query:  string = '' ){
    //para grabar todo en minuscula
    query = query.trim().toLocaleLowerCase();
    //para controlar duplicados
    if( !this._historial.includes( query ) ){

      //Introduce el nuevo valor en el array si no esta duplicado
      this._historial.unshift( query );
      // Corta solo las 10 resultdos del array
      this._historial = this._historial.splice(0 , 10);
      //Guarda en el localstorage el historial
      localStorage.setItem('historial', JSON.stringify( this._historial ));
    }

    //Se construye la url
    const params = new HttpParams()
    .set('api_key', 'OfNVqP5QMSiYWWQw0HHciodL5czrvYXL')
    .set('limit', '10')
    .set('q', query);

    //Hace peticion a la api a traves del objeto HTTP que tiene angular
    this.http.get<SearchGifsResponse>(`${this.servicioURL}/search`, { params })
        .subscribe( resp => {
          this.resultados = resp.data;
          localStorage.setItem('resultados', JSON.stringify( this.resultados ));
        });
  }

}
