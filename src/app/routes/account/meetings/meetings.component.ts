import { Component } from '@angular/core';
import { TabsAccountComponent } from '../../../shared/components/tabs-account/tabs-account.component';

@Component({
    selector: 'app-meetings',
    templateUrl: './meetings.component.html',
    styleUrl: './meetings.component.scss',
    standalone: true,
    imports: [TabsAccountComponent]
})
export class MeetingsComponent {

}
