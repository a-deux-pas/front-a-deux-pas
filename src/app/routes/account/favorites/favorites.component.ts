import { Component } from '@angular/core';
import { TabsAccountComponent } from '../../../shared/components/tabs-account/tabs-account.component';

@Component({
    selector: 'app-favorites',
    templateUrl: './favorites.component.html',
    styleUrl: './favorites.component.scss',
    standalone: true,
    imports: [TabsAccountComponent]
})
export class FavoritesComponent {

}
