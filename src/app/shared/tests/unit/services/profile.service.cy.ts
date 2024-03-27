import { HttpClientModule } from "@angular/common/http";
import { ProfileService } from "../../../../routes/account/profile/profile.service";
import { ProfileComponent } from "../../../../routes/account/profile/profile.component";

// describe('Profile service', () => {
//   it('Should return user information', () => {
//     cy.intercept('GET', 'http://localhost:8081/api/compte/profil/presentation', { fixture: 'user-profile' }).as('getUserInformation');

//     cy.wait('@getUserInformation').then(console.log)
//     //.its('response.statusCode').should('eq', 200);

//   });
// });


// it('cy.intercept() - route responses to matching requests', () => {
//   // https://on.cypress.io/intercept

//   let message = 'whoa, this comment does not exist'

//   // Listen to GET to comments/1
//   //     cy.intercept('GET', 'http://localhost:8081/api/compte/profil/presentation', { fixture: 'user-profile' }).as('getUserInformation');

//   // https://on.cypress.io/wait
//   cy.wait('@getComment').its('response.statusCode').should('be.oneOf', [200, 304])

// })

// context("GET http://localhost:8081/api/compte/profil/presentation", () => {
//   it("gets a user", () => {
//     cy.request("GET", "http://localhost:8081/api/compte/profil/presentation").then((response) => {
//       expect(response.status).to.eq(200)
//     })
//   })
// })

// context("GET http://localhost:8081/api/compte/profil/presentation", () => {
//   it("gets a user", () => {
//     cy.request({url: "http://localhost:8081/api/compte/profil/presentation",
//     followRedirect: false,
//     failOnStatusCode: false,
//   }).then((resp) => {
//     expect(resp.status).to.eq(404);
//     expect(resp.redirectedToUrl).to.eq(undefined);
//   });
//   cy.visit("http://localhost:8081/api/compte/profil/presentation", { failOnStatusCode: false });
//   cy.get(".error-code").should("contain", "404");
//   cy.get(".error-text").should("contain", "Page not found");
//   });
// });



