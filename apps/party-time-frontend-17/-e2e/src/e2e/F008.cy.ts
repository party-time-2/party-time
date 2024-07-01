import { getScreenshotPath } from '../support/utils';

const requirement = "F008";
const eventAcceptanceGroup = 'Zusage zum Event geben';
describe(eventAcceptanceGroup, () => {
  beforeEach(() => {
    cy.visit('/');
  });


  const acceptInvitation = 'Teilnehmer sollten in der Lage sein, ihre Zusage zum Event auf der Plattform zu geben, indem sie auf eine Schaltfläche klicken.';
  it(acceptInvitation, () => {

    cy.screenshot(
      getScreenshotPath(requirement, eventAcceptanceGroup, acceptInvitation),
      {
        overwrite: true,
      }
    );
  });
});

