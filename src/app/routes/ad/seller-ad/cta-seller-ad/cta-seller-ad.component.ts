import { Component, Input, OnInit } from '@angular/core';
import { AdPostResponse } from '../../../../shared/models/ad/ad-post-response.model';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../../../../shared/components/login/login.component';
import { Router, RouterModule } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-cta-seller-ad',
  standalone: true,
  imports: [RouterModule, CommonModule, LoginComponent],
  templateUrl: './cta-seller-ad.component.html',
  styleUrl: './cta-seller-ad.component.scss'
})
export class CtaSellerAdComponent implements OnInit {
  @Input() myAd!: AdPostResponse | undefined
  @Input() isBigScreen!: boolean;
  @Input() onSellerAdPageUnlogged: boolean = false;

  isLoggedIn!: boolean;

  constructor(private router: Router, public modalService: NgbModal) { }

  ngOnInit(): void {
    localStorage.getItem('userId') ? this.isLoggedIn = true : this.isLoggedIn = false
  }

  startCheckout() {
    if (this.isLoggedIn) {
      // To be implemented by Mircea ;) 
    } else {
      this.openModal()
    }
  }

  makeAnOffer() {
    if (this.isLoggedIn) {
      // Don't really know what to do here ..
    } else {
      this.openModal()
    }
  }

  addToFavorites() {
    if (this.isLoggedIn) {
      // To be implemented
    } else {
      this.openModal()
    }
  }

  goToSellerProfile() {
    if (this.isLoggedIn) {
      // To be implemented
    } else {
      this.openModal()
    }
  }

  contactTheSeller() {
    if (this.isLoggedIn) {
      // Don't really know what to do here ..
    } else {
      this.openModal()
    }
  }

  openModal() {
    this.modalService.open(LoginComponent);
    this.onSellerAdPageUnlogged = false
  }
}
