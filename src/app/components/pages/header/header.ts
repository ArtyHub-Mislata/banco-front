import { ChangeDetectorRef, Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CustomerModel } from '../../../models/CustomerModel';
import { HttpService } from '../../../services/http-service';

@Component({
  selector: 'c-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  constructor(
    public httpService: HttpService,
    private router: Router,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit() {}
  logOut() {
    this.router.navigate(['/logout']);
  }
}
