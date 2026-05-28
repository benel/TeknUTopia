import { Given as Soit } from '@badeball/cypress-cucumber-preprocessor';

Soit(
  'je consulte la liste des cours disponibles de {string} session {string} en cliquant sur {string}',
  (level, session, buttonLabel) => {
    cy.visit('/');
    cy.get('button.accordion-button').filter((_, el) =>
      el.innerText.trim().toLowerCase() === `${level} (${session})`.toLowerCase()
    ).click();
  }
);

Soit("aucun cours n'est sélectionné dans mon parcours", () => {
  cy.get('.contribution:visible').should('have.length', 0);
});

Soit(
  'le cours {string} est déjà sélectionné dans mon parcours',
  (course) => {
    cy.get(`input[name="${course}"]`).check({ force: true });
  }
);

