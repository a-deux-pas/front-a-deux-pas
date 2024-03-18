import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { ProfileService } from '../../../routes/account/profile/profile.service';

@Component({
  selector: 'app-user-presentation',
  templateUrl: './user-presentation.component.html',
  styleUrl: './user-presentation.component.scss'
})
export class UserPresentationComponent implements OnInit{

  user! : User;

  constructor(private profileService: ProfileService) {
  }

  ngOnInit(): void {
    // Fetch user's preferred meeting places
    this.profileService.getUserInformation().subscribe((data) => {
    this.user = data;
    });
  }

}
