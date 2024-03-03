import { Component, OnInit } from '@angular/core';
import { HomePageService } from '../home-page.service';

@Component({
  selector: 'app-list-ads',
  templateUrl: './list-ads.component.html',
  styleUrl: './list-ads.component.scss',
})
export class ListAdsComponent implements OnInit {
  constructor(private homePageService: HomePageService) {}

  ngOnInit() {
    this.fetchData(); // Call the fetchData method when the component initializes
  }

  fetchData() {
    this.homePageService.fetchAdsList().subscribe((ads) => {
      console.log(ads);
    });
  }
}
