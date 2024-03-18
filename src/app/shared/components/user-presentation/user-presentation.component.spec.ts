import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPresentationComponent } from './user-presentation.component';

describe('InformationComponent', () => {
  let component: UserPresentationComponent;
  let fixture: ComponentFixture<UserPresentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserPresentationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserPresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
