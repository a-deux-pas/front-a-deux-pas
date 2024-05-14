import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './profile-form.component.html',
  styleUrl: './profile-form.component.scss'
})
export class ProfileFormComponent {
  profileForm = this.formBuilder.group({
    profilePicture: ['', Validators.required],
    alias: ['', [Validators.required, Validators.minLength(3)]],
    bio: ['', Validators.minLength(10)],
    notification: [''],
    address: this.formBuilder.group({
      street: ['', Validators.required],
      zipCode: ['', Validators.required],
      city: ['', Validators.required]
    }),
  });

  constructor(private formBuilder: FormBuilder) {}

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.profileForm.value);
  }

  // TO DO :
  // - composant lieux préférées (utilisation de Form Array)
  // - composant schedule
  // - composant informations bancaires
}
