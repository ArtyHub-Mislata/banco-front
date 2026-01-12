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

  private url = "http://localhost:8080/api"

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
