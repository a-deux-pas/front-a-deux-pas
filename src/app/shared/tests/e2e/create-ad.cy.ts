import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientModule } from "@angular/common/http";
import { CreateAdComponent } from "../../../routes/ads/create-ad/create-ad.component";
import { FormsModule } from "@angular/forms";
import { API_URL } from "../../utils/constants";

context('create new ad testing', () => {
    beforeEach(() => {
        cy.visit('http://localhost:4200/annonce/je-cree-une-annonce')
        cy.url().should('include', 'je-cree');
    });

    // it('the publish button should stay disabled', () => {
    //     cy.get('button[type=submit]').should('be.disabled')
    //     cy.fixture('new-ad').then((newAdData) => {
    //         cy.get('#ad-title').type(newAdData.title)
    //     })
    //     cy.get('button[type=submit]').should('be.disabled')
    // });

    // it('should upload 2 pictures', () => {
    //     cy.get('ng-select[name=selectedPicNumber]').click()
    //     cy.get('div.ng-option').should('be.visible')
    //     cy.get('span').contains('2 photos').click()
    //     cy.get('ngb-carousel').should('be.visible')
    //     cy.get('ngb-carousel img.add-picture-icon#ad-picture-0').click().selectFile('cypress/images/pic-test-1.jpg', { action: 'drag-drop' })
    //     cy.get('span.carousel-control-next-icon').click()
    //     cy.wait(2000)
    //     cy.get('ngb-carousel img.add-picture-icon#ad-picture-1').click().selectFile('cypress/images/pic-test-2.jpg', { action: 'drag-drop' })
    // });

    it('should enter general information about the ad', () => {

        cy.get('ng-select[name=selectedPicNumber]').click()
        cy.get('div.ng-option').should('be.visible')
        cy.get('span').contains('2 photos').click()
        cy.get('ngb-carousel').should('be.visible')
        cy.get('ngb-carousel img.add-picture-icon#ad-picture-0').click().selectFile('cypress/images/pic-test-1.jpg', { action: 'drag-drop' })
        cy.get('span.carousel-control-next-icon').click()
        cy.wait(2000)
        cy.get('ngb-carousel img.add-picture-icon#ad-picture-1').click().selectFile('cypress/images/pic-test-2.jpg', { action: 'drag-drop' })




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

            cy.get('button[type=submit]').click()
            cy.request('POST', `${API_URL}ad/create`).its('body.ad').then((response) => {
                expect(response.body).to.have.property('status')
            })
        })
    });

    // it('should check of the POST request has the right payload', () => {
    //     cy.get('button[type=submit]').click()
    //     cy.request('POST', `${API_URL}ad/create`).its('body.ad').then(ad => {
    //         cy.get('ad.articlePictures').should('have.length', 1)
    //     })
    // });




});

//TEST OU TOUT LES INPUT SONT REMPLU MAIS CERTAIN AVEC DES VALEURS INVALIDES
//COMPLETER the Ad object in payload should have one picture en selectionnant 2 photos puis une




