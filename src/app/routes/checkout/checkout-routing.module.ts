import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './checkout.component';
import { NgModule } from '@angular/core';

const checkoutRoutes: Routes = [
  {
    path: '',
    component: CheckoutComponent,
    children: [
      {
        path: 'recapitulatif',
        loadComponent: () =>
          import(
            './components/step-order-recap/step-order-recap.component'
          ).then((mod) => mod.StepOrderRecapComponent),
      },
      {
        path: 'rdv',
        loadComponent: () =>
          import(
            './components/step-meeting-details/step-meeting-details.component'
          ).then((mod) => mod.StepMeetingDetailsComponent),
      },
      {
        path: 'paiement',
        loadComponent: () =>
          import(
            './components/step-payment-details/step-payment-details.component'
          ).then((mod) => mod.StepPaymentDetailsComponent),
      },
      { path: '', redirectTo: 'recapitulatif', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(checkoutRoutes)],
  exports: [RouterModule],
})
export class CheckoutRoutingModule {}
