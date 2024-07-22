import { AdFormComponent } from "../../components/ads/ad-form/ad-form.component";
import { NgxDropzoneModule } from 'ngx-dropzone';
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
      imports: [NgxDropzoneModule, NgSelectModule, FormsModule, HttpClientModule],
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
    selectCategory(newAdData.category);
    selectSubCategory(newAdData.subcategory);
    fillForm(newAdData);
    uploadPictures();
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
    cy.get('ng-select[name=selectedPicNumber]').click();
    cy.get('div.ng-option').should('be.visible');
    cy.get('ngb-carousel').should('be.visible');
    cy.get('ngb-carousel p.add-picture-btn-text-0').click().selectFile('cypress/fixtures/images/pic-test-1-min.webp', { action: 'drag-drop' });
    cy.get('span.carousel-control-next-icon').click();
    cy.wait(2000);
    cy.get('ngb-carousel img.add-picture-icon#ad-picture-1').click().selectFile('cypress/fixtures/images/pic-test-2-min.webp', { action: 'drag-drop' });
  };

  it('should enter new ad data in the form', () => {
    cy.viewport(550, 750);
    cy.fixture('new-ad').then((newAdData: NewAdData) => {
      loadAdFormComponent(newAdData);
    });
  });
});
