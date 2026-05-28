import { When as Quand } from '@badeball/cypress-cucumber-preprocessor';

Quand(
  "j'ajoute le cours {string} de niveau {string} session {string} à mon parcours",
  (course, level, session) => {
    cy.get(`input[name="${course}"]`).check({ force: true });
  }
);

