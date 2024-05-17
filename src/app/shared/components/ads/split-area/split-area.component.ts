import { Component, ViewChild, OnInit, Input, SimpleChanges } from '@angular/core'
import { SplitComponent, AngularSplitModule } from 'angular-split'
import { UiModule } from '../../../../shared/module/ui/ui.module';
import { CommonModule } from '@angular/common';
import { Ad } from '../../../models/ad/ad.model';
import { AdPostResponse } from '../../../models/ad/ad-post-response.model';



@Component({
  selector: 'app-split-area',
  standalone: true,
  imports: [
    AngularSplitModule,
    CommonModule,
    UiModule,
  ],
  templateUrl: './split-area.component.html',
  styleUrl: './split-area.component.scss'
})
export class SplitAreaComponent implements OnInit {
  @Input() articlePictures: (string | undefined)[] = [];
  @Input() myAd!: AdPostResponse;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['articlePictures']) {
      this.updateSizes();
    }
  }

  updateSizes(): void {
    [this.areaSizeA, this.areaSizeB] = this.setSplitAreasSizes(this.articlePictures.length);
    console.log('this.articlePictures', this.articlePictures);
    console.log('this.articlePictures.length:', this.articlePictures.length);
    console.log('areaSizeA:', this.areaSizeA, 'areaSizeB:', this.areaSizeB);
  }

  @ViewChild('splitAreaA') splitAreaA!: SplitComponent
  @ViewChild('splitAreaB') splitAreaB!: SplitComponent

  areaSizeA!: number
  areaSizeB!: number
  sizesSAA = [30, 25, 15, 50]
  sizesSAB = [70, 75, 85, 50]

  ngOnInit(): void {
    this.updateSizes();
  }

  setSplitAreasSizes(nPictures: number) {
    switch (nPictures) {
      case 3:
        return [this.sizesSAA[0], this.sizesSAB[0]]
      case 4:
        return [this.sizesSAA[1], this.sizesSAB[1]]
      case 5:
        return [this.sizesSAA[2], this.sizesSAB[2]]
      default:
        return [this.sizesSAA[3], this.sizesSAB[3]]
    }
  }
}
