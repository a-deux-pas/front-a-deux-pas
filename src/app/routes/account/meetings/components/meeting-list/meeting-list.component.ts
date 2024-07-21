import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Meeting } from '../../../../../shared/models/meeting/meeting.model';

@Component({
  selector: 'app-meeting-list',
  templateUrl: './meeting-list.component.html',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./meeting-list.component.scss'],
})
export class MeetingListComponent {
  @Input() meetings: Meeting[] = [];
  @Input() selectedMeeting?: Meeting;
  @Output() modify = new EventEmitter<Meeting>();
  @Output() cancel = new EventEmitter<Meeting>();
  @Output() select = new EventEmitter<Meeting>();
  @Input() currentUserId: number | undefined;

  ngOnInit() {
    if (this.meetings.length > 0 && !this.selectedMeeting) {
      this.selectedMeeting = this.meetings[0];
    }
  }

  toggleMeetingDetails(meeting: Meeting): void {
    this.selectedMeeting = this.selectedMeeting === meeting ? undefined : meeting;
    this.select.emit(this.selectedMeeting);
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
    return this.isCurrentUserBuyer(meeting) ? meeting.sellerAlias : meeting.buyerAlias;
  }

  getOtherUserProfilePicture(meeting: Meeting) {
    return this.isCurrentUserBuyer(meeting) ? meeting.sellerProfilePictureUrl : meeting.buyerProfilePictureUrl;
  }

  getOtherUserInscriptionDate(meeting: Meeting){
    return this.isCurrentUserBuyer(meeting) ? meeting.sellerInscriptionDate : meeting.buyerInscriptionDate;
  }

  getBuyerDistinctiveSign(meeting: Meeting) : any {
    if (this.currentUserId === meeting.buyerId) {
      return (meeting.buyerDistinctiveSign);
    } else {
      return meeting.buyerDistinctiveSign
    }
  }

  getSellerDistinctiveSign(meeting: Meeting) {
    if (this.currentUserId === meeting.sellerId) {
      return (meeting.sellerDistinctiveSign);
    } else {
      return meeting.sellerDistinctiveSign
    }
  }

  getBuyerAdditionalInfo(meeting: Meeting) {
    if (this.currentUserId === meeting.buyerId) {
      return (meeting.buyerAdditionalInfo);
    } else {
      return meeting.buyerAdditionalInfo
    }
  }

  getSellerAdditionalInfo(meeting: Meeting)  {
    if (this.currentUserId === meeting.sellerId) {
      return (meeting.sellerAdditionalInfo);
    } else {
      return meeting.sellerAdditionalInfo
    }
  }
  
}