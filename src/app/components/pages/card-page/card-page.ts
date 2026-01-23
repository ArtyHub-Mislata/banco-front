import { Component } from '@angular/core';
import { CardModel } from '../../../models/CardModel';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../../../services/http-service';
import { RouterLink } from '@angular/router';
import { TransactionModel } from '../../../models/TransactionModel';
import { DatePipe, DecimalPipe } from '@angular/common';

@Component({
  selector: 'card-page',
  imports: [RouterLink, DecimalPipe, DatePipe],
  templateUrl: './card-page.html',
  styleUrl: './card-page.scss',
})
export class CardPage {
  card!: CardModel;
  movimientos!: TransactionModel[];

  constructor(
    private route: ActivatedRoute,
    private httpService: HttpService,
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('id');
      if (id) {
        this.loadCard(id);
        this.loadMovimientos(id);
      }
    });
  }

  loadCard(id: string) {
    this.httpService.getCardById(id).subscribe({
      next: (card) => {
        this.card = card;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
  loadMovimientos(id: string) {
    this.httpService.getAllTransactionsOfCard(id).subscribe({
      next: (movimientos) => {
        this.movimientos = movimientos;
        console.log(movimientos);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
