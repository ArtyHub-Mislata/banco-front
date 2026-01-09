import { Component } from '@angular/core';
import { CardModel } from '../../../models/CardModel';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../../../services/http-service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'card-page',
  imports: [RouterLink],
  templateUrl: './card-page.html',
  styleUrl: './card-page.scss',
})
export class CardPage {
  card!: CardModel;

  constructor(private route: ActivatedRoute, private httpService: HttpService) {}

  ngOnInit() {
    this.route.paramMap.subscribe(
      paramMap => {
        const id = paramMap.get('id');
        if(id){
          this.loadCard(id);
        }
      }
    )
  }

  loadCard(id: string){
    this.httpService.getCardById(id).subscribe({
      next: (card) => {
        this.card = card;
      },
      error: (error) => {
        console.error(error);
      }
    })
  }
    
}
