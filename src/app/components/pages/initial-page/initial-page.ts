import { Component } from '@angular/core';
import { CustomerModel } from '../../../models/CustomerModel';
import { HttpService } from '../../../services/http-service';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';

@Component({
  selector: 'app-initial-page',
  imports: [],
  templateUrl: './initial-page.html',
  styleUrl: './initial-page.scss',
})
export class InitialPage {
  customer?: CustomerModel;
  totalAccounts: number = 0;

  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
        this.httpService.isLogged().subscribe({
            next: (customer) => {
                if (!customer) return;

                forkJoin({
                    customer: this.httpService.getUser(),
                    accounts: this.httpService.getAccountsByCustomerId(customer.id?.toString() || ''),
                }).subscribe(({ customer, accounts }) => {
                    this.customer = customer; 
                    this.totalAccounts = accounts.length;
                });
            },
            error: err => console.error('Error al comprobar login:', err)
        });
    }
}
