import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerModel } from '../models/CustomerModel';
import { AccountModel } from '../models/AccountModel';
import { CardModel } from '../models/CardModel';
import { TransactionModel } from '../models/TransactionModel';

@Injectable({
  providedIn: 'root',
})
export class HttpService {

  private url = "http://localhost:8080/api"

  constructor (private httpClient: HttpClient){}
  
  //CUSTOMER

  getCustomerById(id: string): Observable<CustomerModel> {
    return this.httpClient.get<CustomerModel>(`${this.url}/customer/${id}`);
  }

  getCustomerByLogin(login: string): Observable<CustomerModel> {
    return this.httpClient.get<CustomerModel>(`${this.url}/customer/${login}`);
  }

  //ACCOUNTS
  getAccountById(id: string): Observable<AccountModel> {
    return this.httpClient.get<AccountModel>(`${this.url}/account/${id}`);
  }

  getAccountByIban(iban: string): Observable<AccountModel> {
    return this.httpClient.get<AccountModel>(`${this.url}/account/iban/${iban}`);
  }

  getAccountsByCustomerId(id: string): Observable<AccountModel[]> {
    return this.httpClient.get<AccountModel[]>(`${this.url}/customer/${id}/account`);
  }

  getAllAccounts(): Observable<AccountModel[]> {
    return this.httpClient.get<AccountModel[]>(`${this.url}/account`);
  }

  //TRANSACTIONS
  getTransactionById(id: string): Observable<TransactionModel> {
    return this.httpClient.get<TransactionModel>(`${this.url}/transaction/${id}`);
  }

  getTransactionByImporte(importe: number): Observable<TransactionModel> {
    return this.httpClient.get<TransactionModel>(`${this.url}/transaction/amount/${importe}`);
  }

  getTransactionByConcepto(concepto: string): Observable<TransactionModel> {
    return this.httpClient.get<TransactionModel>(`${this.url}/transaction/concept/${concepto}`);
  }

  getTransactionsByAccountId(id: string): Observable<TransactionModel[]> {
    return this.httpClient.get<TransactionModel[]>(`${this.url}/account/${id}/transaction`);
  }

  getAllTransactions(): Observable<TransactionModel[]> {
    return this.httpClient.get<TransactionModel[]>(`${this.url}/transaction`);
  }

  //CARDS
  getCardById(id: string): Observable<CardModel> {
    return this.httpClient.get<CardModel>(`${this.url}/card/${id}`);
  }

  getCardByNumeroTarjeta(numeroTarjeta: string): Observable<CardModel> {
    return this.httpClient.get<CardModel>(`${this.url}/card/cardNumber/${numeroTarjeta}`);
  }

  getCardsByAccountId(id: string): Observable<CardModel[]> {
    return this.httpClient.get<CardModel[]>(`${this.url}/account/${id}/card`);
  }

  getAllCards(): Observable<CardModel[]> {
    return this.httpClient.get<CardModel[]>(`${this.url}/card`);
  }
}
