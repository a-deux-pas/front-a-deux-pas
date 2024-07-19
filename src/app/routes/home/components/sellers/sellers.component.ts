import { Component, OnInit } from '@angular/core';
import { SellersService } from './sellers.service';
import { UserPresentation } from '../../../../shared/models/user/user-presentation.interface';
import { NavigationExtras, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sellers',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './sellers.component.html',
  styleUrl: './sellers.component.scss'
})
export class SellersComponent implements OnInit {
  userId: number = Number(localStorage.getItem('userId'));
  sellers: UserPresentation[] = [];

  constructor(private sellerService: SellersService, private router: Router) {}

  ngOnInit(): void {
    this.fetchSellersNearby(this.userId);
  }

  fetchSellersNearby(userId: number): void {
    this.sellerService.getSellersNearby(userId).subscribe((data) => {
      this.sellers = data;
      // TODO: à modifier une fois la table transaction implémentée
      this.sellers.forEach(seller => {
        seller.salesNumber =  Math.floor(Math.random() * 101).toString()
      });
    })
  }

  goToSellerProfile(alias: string, seller: UserPresentation): void {
    let sellerObject: NavigationExtras = { queryParams: { seller } };
    this.router.navigate(['/profil', alias],
      { state: { seller : sellerObject } },
    );
  }
}
