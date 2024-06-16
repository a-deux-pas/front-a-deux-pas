import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ControlContainer, FormControl, FormGroup, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { EventNotification } from '../../models/user/event-notification.model';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss',
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }],
})
export class NotificationsComponent implements OnInit {
  notificationsForm: any;
  notificationId: number = 0;
  notifications: EventNotification[] = [];
  userId = localStorage.getItem('userId');
  @Output() addNotifications = new EventEmitter<EventNotification[]>();

  constructor(public parentForm: FormGroupDirective) {}

  ngOnInit() {
    this.notificationsForm = this.parentForm.form;
    this.notificationsForm.addControl(
      'emailNotifications',
      new FormGroup({
        notifications: new FormControl(false),
        meetingProposal: new FormControl(false),
        meetingUpdate: new FormControl(false),
        meetingReminder: new FormControl(false),
        meetingToFinalize: new FormControl(false),
        meetingCancelled: new FormControl(false),
      })
    );
    // Sets the value of all checkboxes whenever the value of "notifications" changes
    this.notificationsFormGroup.get('notifications')?.valueChanges.subscribe(value => {
      this.toggleNotificationCheckboxes(value);
    });
    // Update notifications whenever any control in the form group changes
    this.notificationsFormGroup.valueChanges.subscribe(() => {
      this.getNotifications();
    });
  }

  get notificationsFormGroup(): FormGroup {
    return this.notificationsForm.get('emailNotifications') as FormGroup;
  }

  getNotifications() {
    Object.keys(this.notificationsFormGroup.controls).forEach(controlName => {
      const value = this.notificationsFormGroup.get(controlName)?.value;
      if (controlName !== "notifications") {
        // Find the index of an existing notification for the current control
        const existingNotificationIndex = this.notifications.findIndex(notification => notification.eventName === controlName);
        // if notification doesn't already exist
        if (this.userId && value && existingNotificationIndex ===-1) {
          const notification = new EventNotification(this.userId, controlName);
          this.notifications.push(notification);
        // else remove notification
        } else if (!value && existingNotificationIndex !==-1) {
          this.notifications.splice(existingNotificationIndex, 1);
        }
      }
    });
    this.addNotifications.emit(this.notifications);
  }

  toggleNotificationCheckboxes(value: boolean) {
    Object.keys(this.notificationsFormGroup.controls).forEach(key => {
      if (key !== 'notifications') {
        this.notificationsFormGroup.get(key)?.setValue(value);
      }
    });
  }
}
