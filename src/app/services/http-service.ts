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
  getClienteById(id: number): Observable<ClienteModel> {
    return this.httpClient.get<ClienteModel>(`${this.url}/cliente/${id}`);
  }

  getClienteByLogin(login: string): Observable<ClienteModel> {
    return this.httpClient.get<ClienteModel>(`${this.url}/cliente/login/${login}`);
  }

  //CUENTAS
  getCuentaById(id: number): Observable<CuentaModel> {
    return this.httpClient.get<CuentaModel>(`${this.url}/cuenta/${id}`);
  }

  getCuentaByIban(iban: string): Observable<CuentaModel> {
    return this.httpClient.get<CuentaModel>(`${this.url}/cuenta/iban/${iban}`);
  }

  getCuentasByClienteId(id: number): Observable<CuentaModel[]> {
    return this.httpClient.get<CuentaModel[]>(`${this.url}/cliente/${id}/cuenta`);
  }

  //MOVIMIENTOS
  getMovimientoById(id: number): Observable<MovimientoBancarioModel> {
    return this.httpClient.get<MovimientoBancarioModel>(`${this.url}/movimiento/${id}`);
  }

  getMovimientoByImporte(importe: number): Observable<MovimientoBancarioModel> {
    return this.httpClient.get<MovimientoBancarioModel>(`${this.url}/movimiento/importe/${importe}`);
  }

  getMovimientoByConcepto(concepto: string): Observable<MovimientoBancarioModel> {
    return this.httpClient.get<MovimientoBancarioModel>(`${this.url}/movimiento/concepto/${concepto}`);
  }

  getMovimientosByCuentaId(id: number): Observable<MovimientoBancarioModel[]> {
    return this.httpClient.get<MovimientoBancarioModel[]>(`${this.url}/cuenta/${id}/movimiento`);
  }

  //TARJETAS
  getTarjetaById(id: number): Observable<TarjetaCreditoModel> {
    return this.httpClient.get<TarjetaCreditoModel>(`${this.url}/tarjeta/${id}`);
  }

  getTarjetaByNumeroTarjeta(numeroTarjeta: string): Observable<TarjetaCreditoModel> {
    return this.httpClient.get<TarjetaCreditoModel>(`${this.url}/tarjeta/numeroTarjeta/${numeroTarjeta}`);
  }

  getTarjetasByCuentaId(id: number): Observable<TarjetaCreditoModel[]> {
    return this.httpClient.get<TarjetaCreditoModel[]>(`${this.url}/cuenta/${id}/tarjeta`);
  }
}
