import { Component } from '@angular/core';
import { AccountModel } from '../../../models/AccountModel';
import { HttpService } from '../../../services/http-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'account-page',
  imports: [],
  templateUrl: './account-page.html',
  styleUrl: './account-page.scss',
})
export class AccountPage {
  account!: AccountModel;

  constructor(private route: ActivatedRoute, private httpService: HttpService) {}

  ngOnInit() {
    this.route.paramMap.subscribe(
      paramMap => {
        const id = paramMap.get('id');
        if(id){
          this.loadAccount(id);
        }
      }
    )
  }

  loadAccount(id: string) {
    this.httpService.getAccountById(id).subscribe({
      next: (account) => {
        this.account = account;
      },
      error: (error) => {
        console.error(error);
      }
    })
  }
}