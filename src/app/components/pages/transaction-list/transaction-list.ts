import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpService } from '../../../services/http-service';
import { TransactionModel } from '../../../models/TransactionModel';
import { AccountModel } from '../../../models/AccountModel';

@Component({
  selector: 'transaction-list',
  imports: [RouterLink],
  templateUrl: './transaction-list.html',
  styleUrl: './transaction-list.scss',
})
export class TransactionList {
  transactions!: TransactionModel[];
  account!: AccountModel;

  constructor(private httpService: HttpService){}

  ngOnInit() {
    const accountId = this.account.id;
    const accountIdString = accountId?.toString();
    this.getAllTransactionsByAccount(accountIdString!);
  }

  getAllTransactionsByAccount(accountIdString: string) {
    this.httpService.getTransactionsByAccountId(accountIdString).subscribe({
      next: (transactions) => {
        this.transactions = transactions;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
}
