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
  isLogged: boolean = false;
  customer?: CustomerModel;
  
  constructor(private httpService: HttpService, private router: Router, private cd: ChangeDetectorRef) {}

  ngOnInit(){
    this.httpService.isLogged$.subscribe({
      next: (isLogged) =>{
        this.isLogged = isLogged;
        this.cd.detectChanges();
      }
    })
    this.httpService.getCustomerById(this.customer?.id?.toString() || '').subscribe({
      next: (customer) => {
        this.customer = customer;
        this.cd.detectChanges();
      }
    })
  }
  logOut(){
    this.httpService.logout().subscribe({
      next: () => {
        this.router.navigate(['/logout'])
      }, 
      error: (err) =>{
        console.log("HAY UN ERROR EN EL LOGOUT" ,err)
      }

    })
  }
}
