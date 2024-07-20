import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeetingCommon } from '../../../../../shared/models/meeting/meeting-common.model';



@Component({
  selector: 'app-meeting-list',
  templateUrl: './meeting-list.component.html',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./meeting-list.component.scss'],
})
export class MeetingListComponent<T extends MeetingCommon> {
  @Input() meetings: T[] = [];
  @Input() selectedMeeting?: T;
  @Output() modify = new EventEmitter<T>();
  @Output() cancel = new EventEmitter<T>();
  @Output() select = new EventEmitter<T>();
  @Input() currentUserId: number | undefined;

  ngOnInit() {
    if (this.meetings.length > 0 && !this.selectedMeeting) {
      this.selectedMeeting = this.meetings[0];
    }
  }

  toggleMeetingDetails(meeting: T): void {
    this.selectedMeeting = this.selectedMeeting === meeting ? undefined : meeting;
    this.select.emit(this.selectedMeeting);
  }

  onModifyMeeting(meeting: T): void {
    this.modify.emit(meeting);
  }

  onCancelMeeting(meeting: T): void {
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

  isCurrentUserBuyer(meeting: T) {
    return meeting.buyerId === this.currentUserId;
  }

  getOtherUserAlias(meeting: T) {
    return this.isCurrentUserBuyer(meeting) ? meeting.sellerAlias : meeting.buyerAlias;
  }

  getOtherUserProfilePicture(meeting: T) {
    return this.isCurrentUserBuyer(meeting) ? meeting.sellerProfilePictureUrl : meeting.buyerProfilePictureUrl;
  }

  getOtherUserInscriptionDate(meeting: T){
    return this.isCurrentUserBuyer(meeting) ? meeting.sellerInscriptionDate : meeting.buyerInscriptionDate;
  }

  getBuyerDistinctiveSign(meeting: T) : any {
    if (this.currentUserId === meeting.buyerId) {
      return (meeting.buyerDistinctiveSign);
    } else {
      return meeting.buyerDistinctiveSign
    }
  }

  getSellerDistinctiveSign(meeting: T) : any {
    if (this.currentUserId === meeting.sellerId) {
      return (meeting.sellerDistinctiveSign);
    } else {
      return meeting.sellerDistinctiveSign
    }
  }

  getBuyerAdditionalInfo(meeting: T) {
    if (this.currentUserId === meeting.buyerId) {
      return (meeting.buyerAdditionalInfo);
    } else {
      return meeting.buyerAdditionalInfo
    }
  }

  getSellerAdditionalInfo(meeting: T)  {
    if (this.currentUserId === meeting.sellerId) {
      return (meeting.sellerAdditionalInfo);
    } else {
      return meeting.sellerAdditionalInfo
    }
  }
  
}