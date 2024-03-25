import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdFiltersComponent } from './ad-filters.component';

describe('AdFilterComponent', () => {
  let component: AdFiltersComponent;
  let fixture: ComponentFixture<AdFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdFiltersComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
