import { Component, Input } from '@angular/core';
import { UserPresentation } from '../../models/user/user-presentation.model';

@Component({
    selector: 'app-user-presentation',
    templateUrl: './user-presentation.component.html',
    styleUrl: './user-presentation.component.scss',
    standalone: true
})
export class UserPresentationComponent {
  @Input() user!: UserPresentation;
}
