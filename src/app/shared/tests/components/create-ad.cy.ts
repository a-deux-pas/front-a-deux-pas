import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientModule } from "@angular/common/http";
import { CreateAdComponent } from "../../../routes/ads/create-ad/create-ad.component";
import { FormsModule } from "@angular/forms";
import { API_URL } from "../../utils/constants";

describe('create-ad component', () => {
    beforeEach(() => {
        cy.fixture('new-ad').as('newAdData')

        cy.mount(CreateAdComponent, {
            imports: [FormsModule, HttpClientModule],
            declarations: [],
            providers: [],
        })
    });

    it('the publish button should be disabled', () => {
        cy.get('button[type=submit]').should('be.disabled')
        cy.get('#ad-title').type('newAdData.title')
        cy.get('button[type=submit]').should('be.disabled')
    })

    it('it should create a new ad', () => {
        cy.get('button[type=submit]').should('be.disabled')
        cy.get('#picturePick').select('2 photos').should('have.value', '2')
        cy.get('input[type=file] #dropzone0').selectFile('cypress/images/pic-test-1.jpg', { action: 'drag-drop' })
        cy.get('input[type=file] #dropzone1').selectFile('cypress/images/pic-test-2.jpg', { action: 'drag-drop' })
        cy.get('ng-select[name=sub-cat]').should('be.hidden')
        cy.get('ng-select[name=cat]').select('newAdData.category')
        cy.get('ng-select[name=sub-cat]').should('be.visible')
        cy.get('ng-select[name=sub-cat]').select('newAdData.subcategory')
        cy.get('ng-select[name=sub-cat-gender]').should('be.hidden')
        cy.get('#ad-description').type('newAdData.description')
        cy.get('ng-select[name=state]').select('newAdData.articleState')
        cy.get('input[type=number]').select('newAdData.price')
        cy.get('button[type=submit]').should('be.enabled')
        cy.get('button[type=submit]').click()
    })

    it('the Ad object in payload should have one picture', () => {
        cy.request(`${API_URL}ad/create`).its('body.ad').then(ad => {
            cy.get('ad.articlePictures').should('have.length', 1)
        })
    })

    //TEST OU TOUT LES INPUT SONT REMPLU MAIS CERTAIN AVEC DES VALEURS INVALIDES
    //COMPLETER the Ad object in payload should have one picture en selectionnant 2 photos puis une
})

