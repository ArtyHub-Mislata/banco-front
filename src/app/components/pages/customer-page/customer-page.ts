import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CustomerModel } from '../../../models/CustomerModel';
import { AccountModel } from '../../../models/AccountModel';
import { HttpService } from '../../../services/http-service';

@Component({
  selector: 'customer-page',
  imports: [RouterLink],
  templateUrl: './customer-page.html',
  styleUrl: './customer-page.scss',
})
export class CustomerPage {
  customer!: CustomerModel;
  accounts!: AccountModel[];

  constructor(
    private route: ActivatedRoute,
    private httpService: HttpService,
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('id');
      if (id) {
        this.loadUser();
        this.loadAccountsOfUser(id);
      }
    });
  }

  loadUser() {
    this.httpService.getCustomer().subscribe({
      next: (customer) => {
        this.customer = customer;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  loadAccountsOfUser(id: string) {
    this.httpService.getAllAccounts().subscribe({
      next: (accounts) => {
        this.accounts = accounts;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
