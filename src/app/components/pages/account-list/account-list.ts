import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { AccountModel } from '../../../models/AccountModel';
import { CustomerModel } from '../../../models/CustomerModel';
import { HttpService } from '../../../services/http-service';

@Component({
  selector: 'account-list',
  imports: [RouterLink],
  templateUrl: './account-list.html',
  styleUrl: './account-list.scss',
})
export class AccountList {
  accounts!: AccountModel[];
  customer!: CustomerModel;

  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
      this.getAllAccounts();
  }

  getAllAccounts(): void {
      this.httpService.getAllAccounts().subscribe({
        next: (accounts) => {
          this.accounts = accounts;
        },
        error: (error) => {
          console.log(error);
        }
      })
  }
}
