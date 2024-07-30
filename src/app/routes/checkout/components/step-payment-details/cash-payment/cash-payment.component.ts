import { Component } from '@angular/core';
import { BillingSummaryCardComponent } from '../billing-summary-card/billing-summary-card.component';
import { FormsModule } from '@angular/forms';
import { CheckoutService } from '../../../checkout.service';
import { Router } from '@angular/router';
import { catchError, finalize, of } from 'rxjs';
import { DisplayManagementService } from '../../../../../shared/services/display-management.service';
import { ALERTS } from '../../../../../shared/utils/constants/alert-constants';

@Component({
  selector: 'app-cash-payment',
  standalone: true,
  imports: [BillingSummaryCardComponent, FormsModule],
  templateUrl: './cash-payment.component.html',
  styleUrl: './cash-payment.component.scss',
})
export class CashPaymentComponent {
  articlePrice: number | null = null;

  constructor(
    private checkoutService: CheckoutService,
    private router: Router,
    private displayManagementService: DisplayManagementService
  ) {
    this.articlePrice = this.checkoutService.getCheckoutAd().price;
  }

  onSubmit() {
    this.checkoutService
      .proposeMeeting(this.checkoutService.getProposedMeeting())
      .pipe(
        catchError((error) => {
          console.error('Error while initializing the meeting', error);
          this.displayManagementService.displayAlert(ALERTS.DEFAULT_ERROR);
          return of(null);
        }),
        finalize(() => {
          this.router.navigate(['/compte/rdv']);
        })
      )
      .subscribe((result: any) => {
        if (result)
          this.displayManagementService.displayAlert(
            ALERTS.MEETING_INITIALIZED_SUCCESS
          );
      });
  }
}
