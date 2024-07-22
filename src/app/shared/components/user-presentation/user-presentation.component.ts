import { Component, Input, OnInit } from '@angular/core';
import { UserPresentation } from '../../models/user/user-presentation.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-user-presentation',
    templateUrl: './user-presentation.component.html',
    styleUrl: './user-presentation.component.scss',
    standalone: true,
    imports: [CommonModule]
})
export class UserPresentationComponent implements OnInit {
  @Input() user!: UserPresentation;
  isOnUserProfilepage: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.isOnUserProfilepage = this.router.url.includes('compte/profil');
  }
}
