import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent{
  editMode: boolean = false;

  onEditModeChange(editMode: boolean) {
    this.editMode = editMode;
    console.log("je suis passé ici " + this.editMode);
  }
}
