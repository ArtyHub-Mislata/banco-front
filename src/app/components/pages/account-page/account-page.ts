import { Component } from '@angular/core';
import { AccountModel } from '../../../models/AccountModel';
import { HttpService } from '../../../services/http-service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CardModel } from '../../../models/CardModel';
import { TransactionList } from '../transaction-list/transaction-list';
import { TransactionModel } from '../../../models/TransactionModel';
import { DatePipe, DecimalPipe } from '@angular/common';

@Component({
  selector: 'account-page',
  imports: [DecimalPipe, DatePipe, RouterLink],
  templateUrl: './account-page.html',
  styleUrl: './account-page.scss',
})
export class AccountPage {
  account!: AccountModel;
  cardList!: CardModel[];
  transactions!: TransactionModel[];

  constructor(
    private route: ActivatedRoute,
    private httpService: HttpService,
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('id');
      if (id) {
        this.loadAccount(id);
      }
    });
  }

  loadAccount(id: string) {
    this.httpService.getAccountById(id).subscribe({
      next: (account) => {
        this.account = account;
        this.cardList = account.tarjetas;
        this.transactions = account.movimientos;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
