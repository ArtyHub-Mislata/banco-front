import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpService } from '../../../services/http-service';
import { TransactionModel } from '../../../models/TransactionModel';

@Component({
  selector: 'transaction-list',
  imports: [RouterLink],
  templateUrl: './transaction-list.html',
  styleUrl: './transaction-list.scss',
})
export class TransactionList {
  transactions!: TransactionModel[];

  constructor(private httpService: HttpService){}

  ngOnInit() {
    this.getAllTransactions()
  }

  getAllTransactions() {
    this.httpService.getAllTransactions().subscribe({
      next: (transactions) => {
        this.transactions = transactions;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
}
