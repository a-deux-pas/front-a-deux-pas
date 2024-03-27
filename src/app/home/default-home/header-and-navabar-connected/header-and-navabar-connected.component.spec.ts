import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderAndNavabarConnectedComponent } from './header-and-navabar-connected.component';

describe('HeaderAndNavabarConnectedComponent', () => {
  let component: HeaderAndNavabarConnectedComponent;
  let fixture: ComponentFixture<HeaderAndNavabarConnectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderAndNavabarConnectedComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderAndNavabarConnectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
