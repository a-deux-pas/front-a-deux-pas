import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdCardComponent } from './ad-card.component';

describe('AdCardComponent', () => {
  let component: AdCardComponent;
  let fixture: ComponentFixture<AdCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
