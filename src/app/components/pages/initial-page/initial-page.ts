import { Component } from '@angular/core';
import { CustomerModel } from '../../../models/CustomerModel';
import { HttpService } from '../../../services/http-service';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { AccountList } from '../account-list/account-list';
import { AccountModel } from '../../../models/AccountModel';
import { CardModel } from '../../../models/CardModel';
import { TransactionModel } from '../../../models/TransactionModel';
import { DatePipe, DecimalPipe, SlicePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-initial-page',
  imports: [DatePipe, DecimalPipe, SlicePipe, RouterLink],
  templateUrl: './initial-page.html',
  styleUrl: './initial-page.scss',
})
export class InitialPage {
  customer?: CustomerModel;
  accounts!: AccountModel[];
  cards!: CardModel[];
  transactions!: TransactionModel[];
  saldoTotal!: number;
  constructor(private httpService: HttpService) {}
  mostrarSaldos: boolean = true;
  ngOnInit(): void {
    this.loadAccounts();
    this.loadUser();
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
        this.transactions.reverse();

        this.saldoTotal = this.calcularSaldoTotal(accounts);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  loadUser() {
    this.httpService.getCustomer().subscribe({
      next: (customer) => {
        this.customer = customer;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  calcularSaldoTotal(accounts: AccountModel[]) {
    return accounts.reduce((acumulador, cuenta) => acumulador + cuenta.saldo, 0);
  }
  ocultarSaldo() {
    if (this.mostrarSaldos) {
      this.mostrarSaldos = false;
    } else {
      this.mostrarSaldos = true;
    }
  }
}
