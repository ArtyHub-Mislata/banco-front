import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountModel } from '../../../models/AccountModel';
import { HttpService } from '../../../services/http-service';
import { TransferRequest } from '../../../models/TransferModel';
import { CustomerModel } from '../../../models/CustomerModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transfer-page',
  imports: [FormsModule],
  templateUrl: './transfer-page.html',
  styleUrl: './transfer-page.scss',
})
export class TransferPage {
  customer!: CustomerModel;
  accounts!: AccountModel[];
  transfer: TransferRequest = {
    autorizacion: {
      login: '',
      api_token: '',
    },
    origen: {
      iban: '',
    },
    destino: {
      iban: '',
    },
    pago: {
      importe: 0,
      concepto: '',
    },
  };
  constructor(
    private httpService: HttpService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadAccounts();
    this.loadUser();
  }
  loadAccounts() {
    this.httpService.getAllAccounts().subscribe({
      next: (accounts) => {
        this.accounts = accounts;
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
        this.transfer.autorizacion.api_token = customer.api_token;
        this.transfer.autorizacion.login = customer.login;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  ejecutarTransferencia() {
    this.httpService.doATransacction(this.transfer).subscribe({
      next: () => {
        console.log('HA SALIDO BIEEEEEN');
        this.router.navigate([``]);
      },
    });
  }
}
