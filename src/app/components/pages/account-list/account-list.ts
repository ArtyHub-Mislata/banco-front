import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AccountModel } from '../../../models/AccountModel';
import { CustomerModel } from '../../../models/CustomerModel';
import { HttpService } from '../../../services/http-service';
import { FormsModule } from '@angular/forms';
import { TransactionModel } from '../../../models/TransactionModel';

@Component({
  selector: 'account-list',
  imports: [RouterLink, FormsModule],
  templateUrl: './account-list.html',
  styleUrl: './account-list.scss',
})
export class AccountList {
  accounts!: AccountModel[];
  movimientos!: TransactionModel[];
  saldoTotal: number = 0;
  searchText: string = '';

  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    this.getAllAccountsByCustomer();
  }

  getAllAccountsByCustomer(): void {
    this.httpService.getAllAccounts().subscribe({
      next: (accounts) => {
        this.accounts = accounts;
        this.saldoTotal = this.calcularSaldoTotal(accounts);
        this.movimientos = this.accounts.reduce<TransactionModel[]>(
          (acc, cuenta) => acc.concat(cuenta.movimientos),
          [],
        );
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  get filteredAccounts(): AccountModel[] {
    if (!this.searchText) {
      return this.accounts;
    }

    const text = this.searchText.toLowerCase();

    return this.accounts.filter(
      (acc) =>
        acc.iban.toLowerCase().includes(text) ||
        acc.id?.toString().includes(text) ||
        `${acc.cliente.name} ${acc.cliente.lastName1} ${acc.cliente.lastName2}`
          .toLowerCase()
          .includes(text),
    );
  }
  calcularSaldoTotal(accounts: AccountModel[]) {
    return accounts.reduce((acumulador, cuenta) => acumulador + cuenta.saldo, 0);
  }
}
