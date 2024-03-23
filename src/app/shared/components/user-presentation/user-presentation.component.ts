import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-presentation',
  templateUrl: './user-presentation.component.html',
  styleUrl: './user-presentation.component.scss'
})
export class UserPresentationComponent implements OnInit{
  @Input() user!: User;

  ngOnInit(): void {
    console.log(this.user)
  }
}
