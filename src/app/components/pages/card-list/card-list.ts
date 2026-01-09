import { Component } from '@angular/core';
import { CardModel } from '../../../models/CardModel';
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

  constructor(private httpService: HttpService){}

  ngOnInit() {
    this.getAllCards()
  }

  getAllCards() {
    this.httpService.getAllCards().subscribe({
      next: (cards) => {
        this.cards = cards;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
}
