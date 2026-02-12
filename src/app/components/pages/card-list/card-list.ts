import { Component } from '@angular/core';
import { CardModel } from '../../../models/CardModel';
import { AccountModel } from '../../../models/AccountModel';
import { HttpService } from '../../../services/http-service';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'card-list',
  imports: [RouterLink, FormsModule],
  templateUrl: './card-list.html',
  styleUrl: './card-list.scss',
})
export class CardList {
  cards!: CardModel[];
  searchText: string = '';
  
  constructor(private httpService: HttpService){}

  ngOnInit() {
    this.getAllCardsByUser();
  }

  
  getAllCardsByUser(){
    this.httpService.getAllCardsOfUser().subscribe({
      next: (cards) => {
        this.cards = cards;
        console.log(cards)
        
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  get filteredCards(): CardModel[] {
    if (!this.searchText) {
      return this.cards;
    }

    const text = this.searchText.toLowerCase();

    return this.cards.filter(card =>
    card.numeroTarjeta.toLowerCase().includes(text) ||
    card.id?.toString().includes(text) ||
    `${card.nombreCompleto}`
      .toLowerCase()
      .includes(text)
    );
  }
 
}
