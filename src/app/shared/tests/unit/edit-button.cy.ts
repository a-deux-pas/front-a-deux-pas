import { EditButtonComponent } from "../../components/edit-button/edit-button.component";

describe('edit button component', () => {
  it('should toggle edit mode and emit editModeChange event', () => {
    const toggleEditMode = cy.spy().as('toggleEditMode')
    cy.mount(EditButtonComponent, {
      componentProperties: {
        editModeChange: {
          emit: toggleEditMode,
        } as any,
      }
    }).then(() => {
      // Assert initial state
      cy.get('.edit-icon').should('be.visible');
      cy.get('.btn-icon').should('contain', 'modifier');
      cy.get('@toggleEditMode').should('not.have.been.called');
    });

    cy.get('.btn-icon').click().then(() => {
      // Assert edit mode is activated
      cy.get('.save-icon').should('be.visible');
      cy.get('.btn-icon').should('contain', 'mettre à jour');
      cy.get('@toggleEditMode').should('have.been.calledOnce');
    });

    cy.get('.btn-icon').click().then(() => {
      // Assert edit mode is deactivated
      cy.get('.edit-icon').should('be.visible');
      cy.get('.btn-icon').should('contain', 'modifier');
      cy.get('@toggleEditMode').should('have.been.calledTwice');
    });
  });
})
