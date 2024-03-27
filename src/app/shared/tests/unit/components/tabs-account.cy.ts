import { RouterTestingModule } from "@angular/router/testing";
import { NgbNavModule } from "@ng-bootstrap/ng-bootstrap";
import { TabsAccountComponent } from "../../../components/tabs-account/tabs-account.component";

describe('tabs account component', () => {
  it('should render tabs correctly', () => {
    const links = [
      { title: 'Mon profil', fragment: 'profil' },
      { title: 'Mes annonces', fragment: 'annonces'},
      { title: 'Mon RDV', fragment: 'rdv'},
      { title: 'Mes favoris', fragment: 'favoris'}
    ];

    cy.mount(TabsAccountComponent, {
      imports: [ NgbNavModule, RouterTestingModule],
      componentProperties: {
        links: links,
      }
      }).then(() => {
        cy.viewport(780,750);
        cy.get('.nav-tabs').should('be.visible');
        cy.get('ul#account-tabs li').should('have.length', 4);

        cy.get('ul#account-tabs li').each(($li, index) => {
          cy.wrap($li).find('a').should('have.text', links[index].title);
        });
    });
  });
})
