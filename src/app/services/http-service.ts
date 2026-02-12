import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { CustomerModel } from '../models/CustomerModel';
import { AccountModel } from '../models/AccountModel';
import { CardModel } from '../models/CardModel';
import { TransactionModel } from '../models/TransactionModel';
import { CredentialModel } from '../models/CredentialModel';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class HttpService {

  btnIsLogged = new BehaviorSubject<boolean>(this.hasToken());
  isLogged$ = this.btnIsLogged.asObservable();

  private url = "http://localhost:8081/api"

  constructor (private httpClient: HttpClient, private router: Router){}
  
  //CUSTOMER

  getCustomerById(id: string): Observable<CustomerModel> {
    return this.httpClient.get<CustomerModel>(`${this.url}/customer/${id}`);
  }

  getCustomerByLogin(login: string): Observable<CustomerModel> {
    return this.httpClient.get<CustomerModel>(`${this.url}/customer/${login}`);
  }

  //ACCOUNTS
  getAccountById(id: string): Observable<AccountModel> {
    return this.httpClient.get<AccountModel>(`${this.url}/customer/accounts/${id}`);
  }

  getAccountByIban(iban: string): Observable<AccountModel> {
    return this.httpClient.get<AccountModel>(`${this.url}/customer/accounts/iban/${iban}`);
  }

  getAllAccounts(): Observable<AccountModel[]> {
    return this.httpClient.get<AccountModel[]>(`${this.url}/customer/accounts`);
  }

  //TRANSACTIONS
  getTransactionById(idAccount: string, id: string): Observable<TransactionModel> {
    return this.httpClient.get<TransactionModel>(`${this.url}/accounts/${idAccount}/transactions/${id}`);
  }

  getTransactionByImporte(idAccount: string, importe: number): Observable<TransactionModel> {
    return this.httpClient.get<TransactionModel>(`${this.url}/accounts/${idAccount}/transactions/amount/${importe}`);
  }

  getTransactionByConcepto(idAccount: string, concepto: string): Observable<TransactionModel> {
    return this.httpClient.get<TransactionModel>(`${this.url}/accounts/${idAccount}/transactions/concept/${concepto}`);
  }

  getAllTransactions(idAccount: string): Observable<TransactionModel[]> {
    return this.httpClient.get<TransactionModel[]>(`${this.url}/accounts/${idAccount}/transactions`);
  }

  //CARDS
  getCardById(idAccount: string, id: string): Observable<CardModel> {
    return this.httpClient.get<CardModel>(`${this.url}/accounts/${idAccount}/cards/${id}`);
  }

  getCardByNumeroTarjeta(idAccount: string, numeroTarjeta: string): Observable<CardModel> {
    return this.httpClient.get<CardModel>(`${this.url}/accounts/${idAccount}/cards/cardNumber/${numeroTarjeta}`);
  }

  getAllCards(idAccount: string): Observable<CardModel[]> {
    return this.httpClient.get<CardModel[]>(`${this.url}/accounts/${idAccount}/cards`);
  }

  //LOGIN
  login(credential: CredentialModel): Observable<{ api_token: string }> {
    return this.httpClient.post<{ api_token: string }>(`${this.url}/login`, credential)
    .pipe(
      map((resp) => {
        localStorage.setItem('token', resp.api_token);
        this.btnIsLogged.next(true);
        return resp;
      })
    );
  }

  logout(): Observable<void> {
    return this.httpClient.delete<void>(`${this.url}/logout`)
    .pipe(
      map(() => {
        localStorage.removeItem('api_token');
        this.btnIsLogged.next(false);
        this.router.navigate(['/login']);
      })
    );
  }

  isLogged(): Observable<CustomerModel | null> {
    return this.httpClient.get<CustomerModel | null>(`${this.url}/islogged`);
  }

  hasToken(): boolean {
    return !!localStorage.getItem('api_token');
  }

  getUser(): Observable<CustomerModel | undefined> {
    return this.httpClient.get<CustomerModel | undefined>(`${this.url}/islogged`);
  }
}
