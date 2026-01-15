import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from "@angular/router";
import { TransactionModel } from '../../../models/TransactionModel';
import { HttpService } from '../../../services/http-service';

@Component({
  selector: 'transaction-page',
  imports: [RouterLink],
  templateUrl: './transaction-page.html',
  styleUrl: './transaction-page.scss',
})
export class TransactionPage {
    transaction!: TransactionModel;

    constructor(private route: ActivatedRoute, private httpService: HttpService) { }

    ngOnInit() {
        this.route.params.subscribe(
          params => {
            this.loadTransaction(params['idAccount'], params['id']);
          }
        );
    }

    loadTransaction(idAccount: string, id: string) {
      this.httpService.getTransactionById(idAccount, id).subscribe({
        next: (transaction) => {
          this.transaction = transaction;
        },
        error: (error) => {
          console.error(error);
        }
      });
    }
}
