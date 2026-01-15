import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpService } from '../../../services/http-service';
import { TransactionModel } from '../../../models/TransactionModel';
import { AccountModel } from '../../../models/AccountModel';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'transaction-list',
  imports: [RouterLink, FormsModule],
  templateUrl: './transaction-list.html',
  styleUrl: './transaction-list.scss',
})
export class TransactionList {
  transactions!: TransactionModel[];
  account!: AccountModel;
  searchText: string = '';
  filterTipo: string = '';
  filterOrigen: string = '';

  constructor(private httpService: HttpService){}

  ngOnInit() {
    const accountId = this.account.id;
    const accountIdString = accountId?.toString();
    this.getAllTransactionsByAccount(accountIdString!);
  }

  getAllTransactionsByAccount(accountIdString: string) {
    this.httpService.getAllTransactions(accountIdString).subscribe({
      next: (transactions) => {
        this.transactions = transactions;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  get filteredTransactions(): TransactionModel[] {
    if (!this.searchText) {
      return this.transactions;
    }

    const text = this.searchText.toLowerCase();

    return this.transactions.filter(transaction =>
      transaction.id?.toString().includes(text) ||
      transaction.tipoMovimiento.toLowerCase().includes(text) ||
      transaction.origenMovimiento.toLowerCase().includes(text) ||
      transaction.fecha.toString().includes(text) ||
      transaction.importe.toString().includes(text) ||
      transaction.concepto.toLowerCase().includes(text) ||
      transaction.cuenta.iban.toLowerCase().includes(text)
    ).filter(transaction =>
      !this.filterTipo || transaction.tipoMovimiento === this.filterTipo
    ).filter(transaction =>
      !this.filterOrigen || transaction.origenMovimiento === this.filterOrigen
    );
  }
}
