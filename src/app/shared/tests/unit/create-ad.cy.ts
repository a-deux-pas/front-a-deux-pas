import { AdFormComponent } from "../../components/ads/ad-form/ad-form.component";
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { AdService } from "../../../routes/ad/ad.service";
import { UploadPictureService } from "../../services/upload-picture.service";
import { DisplayManagementService } from "../../services/display-management.service";
import { Router } from "@angular/router";
import { of } from "rxjs";
import { HttpClient, HttpClientModule, HttpHandler } from "@angular/common/http";
import { RouterTestingModule } from "@angular/router/testing";
import '@angular/localize/init';

describe('ad form component test', () => {
    it('should enter new ad data in the form', () => {
      cy.fixture('new-ad').then((newAdData) => {
        cy.mount(AdFormComponent, {
          imports: [NgxDropzoneModule, NgSelectModule, FormsModule, HttpClientModule, RouterTestingModule],
          providers: [AdService, UploadPictureService, DisplayManagementService],
          componentProperties: {
            formTitle: 'Créer une annonce',
            isCreateAdForm: true,
            isBigScreen: true,
          },
        }).then(() => {
                cy.get('ng-select[name=selectedPicNumber]').click()
        cy.get('div.ng-option').should('be.visible')
        cy.get('ngb-carousel').should('be.visible')
        cy.get('ngb-carousel img.add-picture-icon#ad-picture-0').click().selectFile('cypress/fixtures/images/pic-test-1-min.webp', { action: 'drag-drop' })
        cy.get('span.carousel-control-next-icon').click()
        cy.wait(2000)
        cy.get('ngb-carousel img.add-picture-icon#ad-picture-1').click().selectFile('cypress/fixtures/images/pic-test-2-min.webp', { action: 'drag-drop' })

        cy.get('ng-select[name=cat]').click()
        cy.get('div.ng-option').should('be.visible')
        cy.fixture('new-ad').then((newAdData) => {
            cy.get('span').contains(newAdData.category).click()
            cy.get('ng-select[name=sub-cat]').click()
            cy.get('span').contains(newAdData.subcategory).click()
            cy.get('#ad-title').type(newAdData.title)
            cy.get('#ad-description').type(newAdData.articleDescription)
            cy.get('ng-select[name=state]').click()
            cy.get('span').contains(newAdData.articleState).click()
            cy.get('#ad-price').type(newAdData.price)
            cy.get('button[type=submit]').should('be.enabled').click()
        })
            })
        })
    })
});