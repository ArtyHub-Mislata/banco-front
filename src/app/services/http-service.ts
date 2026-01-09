import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClienteModel } from '../models/ClienteModel';
import { CuentaModel } from '../models/CuentaModel';
import { MovimientoBancarioModel } from '../models/MovimientoBancarioModel';
import { TarjetaCreditoModel } from '../models/TarjetaCreditoModel';

@Injectable({
  providedIn: 'root',
})
export class HttpService {

  private url = "http://localhost:8080/api"

  constructor (private httpClient: HttpClient){}
  
  //CLIENTE
  getClienteByLogin(login: string): Observable<ClienteModel> {
    return this.httpClient.get<ClienteModel>(`${this.url}/customer/${login}`);
  }

  //CUENTAS
  getCuentaById(id: number): Observable<CuentaModel> {
    return this.httpClient.get<CuentaModel>(`${this.url}/account/${id}`);
  }

  getCuentaByIban(iban: string): Observable<CuentaModel> {
    return this.httpClient.get<CuentaModel>(`${this.url}/account/iban/${iban}`);
  }

  getCuentasByClienteId(id: number): Observable<CuentaModel[]> {
    return this.httpClient.get<CuentaModel[]>(`${this.url}/customer/${id}/account`);
  }

  //MOVIMIENTOS
  getMovimientoById(id: number): Observable<MovimientoBancarioModel> {
    return this.httpClient.get<MovimientoBancarioModel>(`${this.url}/transaction/${id}`);
  }

  getMovimientoByImporte(importe: number): Observable<MovimientoBancarioModel> {
    return this.httpClient.get<MovimientoBancarioModel>(`${this.url}/transaction/amount/${importe}`);
  }

  getMovimientoByConcepto(concepto: string): Observable<MovimientoBancarioModel> {
    return this.httpClient.get<MovimientoBancarioModel>(`${this.url}/transaction/concept/${concepto}`);
  }

  getMovimientosByCuentaId(id: number): Observable<MovimientoBancarioModel[]> {
    return this.httpClient.get<MovimientoBancarioModel[]>(`${this.url}/account/${id}/transaction`);
  }

  //TARJETAS
  getTarjetaById(id: number): Observable<TarjetaCreditoModel> {
    return this.httpClient.get<TarjetaCreditoModel>(`${this.url}/card/${id}`);
  }

  getTarjetaByNumeroTarjeta(numeroTarjeta: string): Observable<TarjetaCreditoModel> {
    return this.httpClient.get<TarjetaCreditoModel>(`${this.url}/card/cardNumber/${numeroTarjeta}`);
  }

  getTarjetasByCuentaId(id: number): Observable<TarjetaCreditoModel[]> {
    return this.httpClient.get<TarjetaCreditoModel[]>(`${this.url}/account/${id}/card`);
  }
}
