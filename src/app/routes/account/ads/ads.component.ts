import { Component, OnInit } from '@angular/core';
import { TabsAccountComponent } from '../../../shared/components/tabs-account/tabs-account.component';
import { CommonModule } from '@angular/common';
import { AdPostResponse } from '../../../shared/models/ad/ad-post-response.model';
import { Subscription } from 'rxjs';
import { AdService } from '../../Ad.service';
import { UtilsService } from '../../../shared/services/utils-service';
import { AdCardComponent } from '../../../shared/components/ads/ad-card/ad-card.component';
import { Router } from '@angular/router';

@Component({
    selector: 'app-ads',
    templateUrl: './ads.component.html',
    styleUrl: './ads.component.scss',
    standalone: true,
    imports: [TabsAccountComponent, CommonModule, AdCardComponent]
})
export class AdsComponent implements OnInit {
    isBigScreen: boolean | undefined;
    windowSizeSubscription: Subscription;
    myAd: AdPostResponse | undefined;
    articlePictures: (string | undefined)[] = [];
    myAds: AdPostResponse[] = [];

    constructor(
        private adService: AdService,
        private utilsService: UtilsService,
        private router: Router
    ) {
        this.windowSizeSubscription = this.utilsService.isBigScreen$.subscribe(isBigScreen => {
            this.isBigScreen = isBigScreen;
        });
    }

    ngOnInit(): void {
        // TO DO : Mettre à jour la logique une fois que le processus de connexion sera implémenté
        //Pas sure de devoir ajouter un paramètre à la route 
        //Avec la connexion, on pourrait juste prendre le currentUserId depuis le storage
        this.adService.findMyAds(1).subscribe({
            next: (myAds: AdPostResponse[]) => {
                this.myAds = myAds.sort((ad1, ad2) => {
                    if ((ad1.status === 'RESERVED' || ad1.status === 'SOLD') && !(ad2.status === 'RESERVED' || ad2.status === 'SOLD')) {
                        return 1;
                    }
                    if (!(ad1.status === 'RESERVED' || ad1.status === 'SOLD') && (ad2.status === 'RESERVED' || ad2.status === 'SOLD')) {
                        return -1;
                    }
                    return 0;
                });
            },
            error: error => {
                console.error(error);
            }
        });
    }

    createNewAd(): void {
        this.router.navigate(['annonce/creation']);
    }

}
