import { Component, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Meeting } from '../../../../../shared/models/meeting/meeting.model';
import { Router, RouterModule } from '@angular/router';
import { MeetingService } from '../../meeting.service';
import { MeetingStatus } from '../../../../../shared/models/enum/meeting-status.enum';

@Component({
  selector: 'app-meeting-list',
  templateUrl: './meeting-list.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule],
  styleUrls: ['./meeting-list.component.scss'],
})
export class MeetingListComponent {
  @Input() meetings: Meeting[] = [];
  @Input() selectedMeeting?: Meeting;
  @Input() currentUserId: number | undefined;
  @Input() isBuyer: boolean = false;
  @Output() modify = new EventEmitter<Meeting>();
  @Output() cancel = new EventEmitter<Meeting>();
  @Output() select = new EventEmitter<Meeting>();
  @Output() accept = new EventEmitter<Meeting>();
  @Output() finalize = new EventEmitter<Meeting>();
  meetingsLoading: boolean = true;
  meetingStatus = MeetingStatus;

  constructor(private meetingService: MeetingService, private router: Router) { }

  ngOnInit() {
    if (this.meetings.length > 0 && !this.selectedMeeting) {
      this.selectedMeeting = this.meetings[0];
    }

    setTimeout(() => {
      this.meetingsLoading = false;
    }, 300);
  }

  toggleMeetingDetails(meeting: Meeting): void {
    this.selectedMeeting =
      this.selectedMeeting === meeting ? undefined : meeting;
    this.select.emit(this.selectedMeeting);
  }

  onAcceptMeeting(meeting: Meeting): void {
    this.accept.emit(meeting);
  }

  onModifyMeeting(meeting: Meeting): void {
    this.modify.emit(meeting);
  }

  onCancelMeeting(meeting: Meeting): void {
    this.cancel.emit(meeting);
  }

  modifyMeeting() {
    if (this.selectedMeeting) {
      this.modify.emit(this.selectedMeeting);
    }
  }

  cancelMeeting() {
    if (this.selectedMeeting) {
      this.cancel.emit(this.selectedMeeting);
    }
  }

  isCurrentUserBuyer(meeting: Meeting) {
    return meeting.buyerId === this.currentUserId;
  }

  getOtherUserAlias(meeting: Meeting) {
    return this.isCurrentUserBuyer(meeting)
      ? meeting.sellerAlias
      : meeting.buyerAlias;
  }

  getOtherUserProfilePicture(meeting: Meeting) {
    return this.isCurrentUserBuyer(meeting)
      ? meeting.sellerProfilePictureUrl
      : meeting.buyerProfilePictureUrl;
  }

  getOtherUserInscriptionDate(meeting: Meeting) {
    return this.isCurrentUserBuyer(meeting)
      ? meeting.sellerInscriptionDate :
      meeting.buyerInscriptionDate;
  }

  getOtherUserCity(meeting: Meeting) {
    return this.isCurrentUserBuyer(meeting)
      ? meeting.sellerCity :
      meeting.buyerCity;
  }

  goToAdDetailsPage(meeting: Meeting) {
    const userAlias = localStorage.getItem('userAlias');
    if (meeting.adPublisherAlias == userAlias) {
      this.router.navigate(['/compte/annonces/mon-annonce/', meeting.adId]);
    } else {
      this.router.navigate(['/annonce', meeting.adPublisherAlias, meeting.adId]);
    }
  }

  finalizeMeeting(meeting: Meeting) {
    this.finalize.emit(meeting)
    console.log('meeting::', meeting)
    console.log('selectedmeeting:: ', this.selectedMeeting)


    setTimeout(() => {
      console.log('meeting = selected metting:: ', meeting === this.selectedMeeting)
      console.log('after')
      console.log('meeting::', meeting)
      console.log('selectedmeeting:: ', this.selectedMeeting)

    }, 5000);
  }
}
