import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-order-recap-card',
  standalone: true,
  imports: [],
  templateUrl: './order-recap-card.component.html',
  styleUrl: './order-recap-card.component.scss',
})
export class OrderRecapCardComponent {
  @Input() ad: any;

  ngOnInit() {
    console.log(this.ad);
  }
}
