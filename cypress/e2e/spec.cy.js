describe('Run tests ', () => {
    it('successfully loads', () => {
      cy.visit('http://localhost:3000')
      cy.get('div[id="horseListComponent"]')
      cy.get('.horseListTableElement').should('have.length', 20)
      cy.get('button[id="startRaceButton"').should('be.disabled')
      cy.get('button[id="generateProgramButton"]').click()
      cy.get('div[id="programComponent"]')
      cy.get('div[id="simulationComponent"]')
      cy.get('.race-track')
      cy.get('.race-row').should('have.length', 10)
      cy.get('.raceElement').should('have.length', 6)
      cy.get('.raceElementTableItem').should('have.length', 60)
      cy.get('button[id="startRaceButton"]').click()
      const checkIsRaceFinished = () => {
        cy.window().its('$nuxt').then((nuxt) => {
          const isRaceFinished = nuxt.$store.state.isRaceFinished;
          if (isRaceFinished) {
            cy.get('div[id="simulationComponent"]').should('exist');
            cy.log('Tests finished successfully');
          } else {
            cy.wait(1000); // wait 1000 ms
            checkIsRaceFinished(); // check again
          }
        });
      };
      checkIsRaceFinished();
    })
  })