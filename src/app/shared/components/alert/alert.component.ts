import { Component, OnInit } from '@angular/core';
import { Alert, AlertType } from '../../models/alert.model';
import { CommonModule } from '@angular/common';
import { DisplayManagementService } from '../../services/display-management.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss'
})
export class AlertComponent implements OnInit {
  showAlert: boolean = false;
  incommingAlert: Alert = {
    message: '',
    type: AlertType.SUCCESS,
  };

  constructor(private displayManagementService: DisplayManagementService) {}

  ngOnInit(): void {
    this.displayManagementService.alertRequest$.pipe(
      tap((alert: Alert) => {
        this.incommingAlert = alert;
        this.showAlert = true;
        setTimeout(() => {
          this.showAlert = false;
        }, 2500);
      })
    ).subscribe();
  }
}
