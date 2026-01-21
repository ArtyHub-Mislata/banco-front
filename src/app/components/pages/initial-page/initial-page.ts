import { Component } from '@angular/core';
import { CustomerModel } from '../../../models/CustomerModel';
import { HttpService } from '../../../services/http-service';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { AccountList } from '../account-list/account-list';
import { AccountModel } from '../../../models/AccountModel';
import { CardModel } from '../../../models/CardModel';
import { TransactionModel } from '../../../models/TransactionModel';
import { DatePipe, DecimalPipe, SlicePipe } from '@angular/common';

@Component({
  selector: 'app-initial-page',
  imports: [DatePipe, DecimalPipe, SlicePipe],
  templateUrl: './initial-page.html',
  styleUrl: './initial-page.scss',
})
export class InitialPage {
  customer?: CustomerModel;
  accounts!: AccountModel[];
  cards!: CardModel[];
  transactions!: TransactionModel[];

  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    this.loadAccounts();
    this.loadUser();
  }
  loadUser() {
    this.httpService.getUser().subscribe({
      next: (user) => {
        this.customer = user;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  loadAccounts() {
    this.httpService.getAllAccounts().subscribe({
      next: (accounts) => {
        this.accounts = accounts;
        this.cards = accounts.reduce<CardModel[]>((acc, cuenta) => acc.concat(cuenta.tarjetas), []);
        this.transactions = accounts.reduce<TransactionModel[]>(
          (acc, cuenta) => acc.concat(cuenta.movimientos),
          [],
        );
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
