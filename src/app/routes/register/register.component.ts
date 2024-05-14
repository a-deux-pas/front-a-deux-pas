import { Component } from '@angular/core';
import { RegisterDetailsFormComponent } from './register-details-form/register-details-form.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RegisterDetailsFormComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

}
