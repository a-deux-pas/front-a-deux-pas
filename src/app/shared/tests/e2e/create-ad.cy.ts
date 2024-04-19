context('create new ad testing', () => {
    beforeEach(() => {
        cy.visit('http://localhost:4200/annonce/creation')
        cy.url().should('include', 'je-cree');
    });

    it('the publish button should stay disabled', () => {
        cy.get('button[type=submit]').should('be.disabled')
        cy.fixture('new-ad').then((newAdData) => {
            cy.get('#ad-title').type(newAdData.title)
        })
        cy.get('button[type=submit]').should('be.disabled')
    });

    it('should create an Ad object', () => {

        cy.get('ng-select[name=selectedPicNumber]').click()
        cy.get('div.ng-option').should('be.visible')
        cy.get('span').contains('2 photos').click()
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
            cy.get('button[type=submit]').should('be.disabled')
            cy.get('#ad-description').type(newAdData.articleDescription)
            cy.get('ng-select[name=state]').click()
            cy.get('span').contains(newAdData.articleState).click()
            cy.get('#ad-price').type(newAdData.price)
            cy.get('button[type=submit]').should('be.enabled').click()
        })
    });
});
