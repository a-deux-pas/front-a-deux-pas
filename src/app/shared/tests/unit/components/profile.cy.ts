import { HttpClientModule } from "@angular/common/http";
import { ProfileComponent } from "../../../../routes/account/profile/profile.component";
import { ProfileService } from "../../../../routes/account/profile/profile.service";

describe('Profile service', () => {
  it('Should mount the service', () => {
    cy.mount(ProfileComponent, {
      imports: [HttpClientModule],
      providers: [ProfileService],
    })

  });
});
