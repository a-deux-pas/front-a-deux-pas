import { AdFormComponent } from "../../components/ads/ad-form/ad-form.component";
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { AdService } from "../../services/ad.service";
import { DisplayManagementService } from "../../services/display-management.service";
import { HttpClientModule } from "@angular/common/http";
import '@angular/localize/init';

interface NewAdData {
  category: string;
  subcategory: string;
  title: string;
  articleDescription: string;
  articleState: string;
  price: string;
}

describe('ad form component test', () => {
  const loadAdFormComponent = (newAdData: NewAdData) => {
    cy.mount(AdFormComponent, {
      imports: [NgSelectModule, FormsModule, HttpClientModule],
      providers: [AdService, DisplayManagementService],
      componentProperties: {
        formTitle: 'Créer une annonce',
        isCreateAdForm: true,
        isBigScreen: true,
      },
    }).then(() => {
      enterAdData(newAdData);
    });
  };

  const enterAdData = (newAdData: NewAdData) => {
    uploadPictures();
    selectCategory(newAdData.category);
    selectSubCategory(newAdData.subcategory);
    fillForm(newAdData);

  };

  const selectCategory = (category: string) => {
    cy.get('ng-select[name=cat]').click();
    cy.get('div.ng-option').should('be.visible');
    cy.get('span').contains(category).click();
  };

  const selectSubCategory = (subcategory: string) => {
    cy.get('ng-select[name=sub-cat]').click();
    cy.get('span').contains(subcategory).click();
  };

  const fillForm = (newAdData: NewAdData) => {
    cy.get('#ad-title').type(newAdData.title);
    cy.get('#ad-description').type(newAdData.articleDescription);
    cy.get('ng-select[name=state]').click();
    cy.get('span').contains(newAdData.articleState).click();
    cy.get('#ad-price').type(newAdData.price);
  };

  const uploadPictures = () => {
    cy.get('dropzone').should('be.visible');
    cy.get('[data-cy=dropzone]').first().click().selectFile('cypress/fixtures/images/pic-test-1-min.webp', { action: 'drag-drop' });
    cy.get('[data-cy=dropzone]').last().click().selectFile('cypress/fixtures/images/pic-test-2-min.webp', { action: 'drag-drop' });
  };

  it('should enter new ad data in the form', () => {
    cy.fixture('new-ad').then((newAdData: NewAdData) => {
      loadAdFormComponent(newAdData);
    });
  });
});
