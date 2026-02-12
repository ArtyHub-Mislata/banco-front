import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { CustomerModel } from '../models/CustomerModel';
import { AccountModel } from '../models/AccountModel';
import { CardModel } from '../models/CardModel';
import { TransactionModel } from '../models/TransactionModel';
import { CredentialModel } from '../models/CredentialModel';
import { Router } from '@angular/router';
import { TransferRequest } from '../models/TransferModel';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private url = 'http://bank-back-artyhub.producciondaw.cip.fpmislata.com/api';

  constructor(
    private httpClient: HttpClient,
    private router: Router,
  ) {}

<<<<<<< HEAD
  private url = "http://localhost:8081/api"

  constructor (private httpClient: HttpClient, private router: Router){}
  
=======
  //TRANSFERENCIA
  doATransacction(transfer: TransferRequest): Observable<void> {
    return this.httpClient.post<void>(`${this.url}/transferencia`, transfer);
  }
>>>>>>> refs/remotes/origin/develop
  //CUSTOMER

  getCustomer(): Observable<CustomerModel> {
    return this.httpClient.get<CustomerModel>(`${this.url}/customer`);
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
    return this.httpClient.get<TransactionModel>(
      `${this.url}/accounts/${idAccount}/transactions/${id}`,
    );
  }

  getTransactionByImporte(idAccount: string, importe: number): Observable<TransactionModel> {
    return this.httpClient.get<TransactionModel>(
      `${this.url}/accounts/${idAccount}/transactions/amount/${importe}`,
    );
  }

  getTransactionByConcepto(idAccount: string, concepto: string): Observable<TransactionModel> {
    return this.httpClient.get<TransactionModel>(
      `${this.url}/accounts/${idAccount}/transactions/concept/${concepto}`,
    );
  }

  getAllTransactions(idAccount: string): Observable<TransactionModel[]> {
    return this.httpClient.get<TransactionModel[]>(
      `${this.url}/accounts/${idAccount}/transactions`,
    );
  }

  //CARDS
  getCardById(id: string): Observable<CardModel> {
    return this.httpClient.get<CardModel>(`${this.url}/cards/${id}`);
  }
  getAllTransactionsOfCard(id: string): Observable<TransactionModel[]> {
    return this.httpClient.get<TransactionModel[]>(`${this.url}/cards/${id}/transactions`);
  }

  getCardByNumeroTarjeta(idAccount: string, numeroTarjeta: string): Observable<CardModel> {
    return this.httpClient.get<CardModel>(
      `${this.url}/accounts/${idAccount}/cards/cardNumber/${numeroTarjeta}`,
    );
  }

  getAllCards(idAccount: string): Observable<CardModel[]> {
    return this.httpClient.get<CardModel[]>(`${this.url}/accounts/${idAccount}/cards`);
  }
  getAllCardsOfUser() {
    return this.httpClient.get<CardModel[]>(`${this.url}/cards`);
  }

  //LOGIN
  private loggedSubject = new BehaviorSubject<boolean>(false);
  isLogged$ = this.loggedSubject.asObservable();

  login(credential: CredentialModel): Observable<{ token: string }> {
    return this.httpClient.post<{ token: string }>(`${this.url}/login`, credential).pipe(
      map((resp) => {
        console.log(resp);

        localStorage.setItem('token', resp.token);
        this.loggedSubject.next(true);
        return resp;
      }),
    );
  }

  logout(): Observable<void> {
    return this.httpClient.delete<void>(`${this.url}/logout`).pipe(
      map(() => {
        localStorage.removeItem('token');
        this.loggedSubject.next(false);
        this.router.navigate(['/login']);
      }),
    );
  }

  isLogged(): Observable<CustomerModel | null> {
    return this.httpClient.get<CustomerModel | null>(`${this.url}/islogged`);
  }
}
