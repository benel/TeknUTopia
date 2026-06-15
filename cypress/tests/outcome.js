import { Then as Alors } from '@badeball/cypress-cucumber-preprocessor';

Alors(
  "{string} doit apparaître dans {int} blocs de compétence", 
  (course, n) => {
    cy.get(`.contribution-wrapper:has(.contribution:contains(${course}):visible)`).should('have.length', n)
  }
);

