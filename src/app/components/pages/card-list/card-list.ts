import { Component } from '@angular/core';
import { CardModel } from '../../../models/CardModel';
import { AccountModel } from '../../../models/AccountModel';
import { HttpService } from '../../../services/http-service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'card-list',
  imports: [RouterLink],
  templateUrl: './card-list.html',
  styleUrl: './card-list.scss',
})
export class CardList {
  cards!: CardModel[];
  account!: AccountModel;

  constructor(private httpService: HttpService){}

  ngOnInit() {
    const accountId = this.account.id;
    const accountIdString = accountId?.toString();
    this.getAllCardsByAccount(accountIdString!);
  }

  getAllCardsByAccount(accountIdString: string) {
    this.httpService.getCardsByAccountId(accountIdString).subscribe({
      next: (cards) => {
        this.cards = cards;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
}
