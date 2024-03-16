import { Component, OnInit } from '@angular/core';
import { AdListService } from './ad-list.service';
import { HomePageAd } from '../../../models/HomePageAd.model';

@Component({
  selector: 'app-ad-list',
  templateUrl: './ad-list.component.html',
  styleUrl: './ad-list.component.scss',
  //styleUrls: ['./ad-list.component.scss'],
})
export class AdListComponent implements OnInit {
  ads: HomePageAd[] = [];

  constructor(private adListService: AdListService) {}

  ngOnInit() {
    this.fetchData(); // Call the fetchData method when the component initializes
  }

  fetchData() {
    this.adListService.fetchAdsList().subscribe((ads: HomePageAd[]) => {
      this.ads = ads;
      console.log(ads);
    });
  }
}
