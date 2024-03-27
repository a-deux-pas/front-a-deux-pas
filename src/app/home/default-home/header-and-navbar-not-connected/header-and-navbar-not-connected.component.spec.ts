import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderAndNavbarNotConnectedComponent } from './header-and-navbar-not-connected.component';

describe('HeaderAndNavbarNotConnectedComponent', () => {
  let component: HeaderAndNavbarNotConnectedComponent;
  let fixture: ComponentFixture<HeaderAndNavbarNotConnectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderAndNavbarNotConnectedComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderAndNavbarNotConnectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
