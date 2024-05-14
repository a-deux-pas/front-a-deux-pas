import { Component } from '@angular/core';
import { ProfileFormComponent } from './profile-form/profile-form.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ProfileFormComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

}
