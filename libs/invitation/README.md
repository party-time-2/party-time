# F008 - Accept Invitation

This library implements F008 - Accept Invitation.  
See [F008 Zusage zum Event geben](https://github.com/party-time-2/party-time/issues/8) for more information.

The sequence diagram for this library can be found at [/docs/F008/F008_zusageZumEventGeben_seq.plantuml](/docs/F008/F008_zusageZumEventGeben_seq.plantuml)

![F008_eventZusagen_seq](/docs/PNG/F008/F008_zusageZumEventGeben_seq.png)

\newpage

The activity diagram for this library can be found at [/docs/F008/F008_zusageZumEventGeben_act.plantuml](/docs/F008/F008_zusageZumEventGeben_act.plantuml)

![F008_eventZusagen_act](/docs/PNG/F008/F008_zusageZumEventGeben_act.png)

\newpage

<!-- The controller for this library can be found at [/apps/party-time-backend/src/main/java/com/partytime/api/controller/EventParticipantController.java](/apps/party-time-backend/src/main/java/com/partytime/api/controller/EventParticipantController.java) -->

The Test-Cases for this library can be found at [/apps/party-time-frontend-e2e/src/e2e/invitation.cy.ts](/apps/party-time-frontend-e2e/src/e2e/invitation.cy.ts)

![invite_accepted](/docs/PNG/F008/Tests/accept-invite%20success%20--%20should%20show%20invite_accepted.png)

![event_not_found](/docs/PNG/F008/Tests/accet-invite%20error%20--%20should%20show%20event_not_found.png)

![participant_not_invited](/docs/PNG/F008/Tests/accet-invite%20error%20--%20should%20show%20participant_not_invited.png)

\newpage

# F009 - Decline Invitation

This library implements F009 - Decline Invitation.  
See [F009 Absage zum Event geben](https://github.com/party-time-2/party-time/issues/9) for more information.

The sequence diagram for this library can be found at [/docs/F009/F009_absageZumEventGeben_seq.plantuml](/docs/F009/F009_absageZumEventGeben_seq.plantuml)

![F009_eventAbsagen_seq](/docs/PNG/F009/F009_absageZumEventGeben_seq.png)

\newpage

The activity diagram for this library can be found at [/docs/F009/F009_absageZumEventGeben_act.plantuml](/docs/F009/F009_absageZumEventGeben_act.plantuml)

![F009_eventAbsagen_act](/docs/PNG/F009/F009_absageZumEventGeben_act.png)

\newpage

<!-- The controller for this library can be found at [/apps/party-time-backend/src/main/java/com/partytime/api/controller/EventParticipantController.java](/apps/party-time-backend/src/main/java/com/partytime/api/controller/EventParticipantController.java) -->

The Test-Cases for this library can be found at [/apps/party-time-frontend-e2e/src/e2e/invitation.cy.ts](/apps/party-time-frontend-e2e/src/e2e/invitation.cy.ts)

![invite_declined](/docs/PNG/F009/Tests/decline-invite%20success%20--%20should%20show%20invite_declined.png)

![event_not_found](/docs/PNG/F009/Tests/decline-invite%20error%20--%20should%20show%20event_not_found.png)

![participant_not_invited](/docs/PNG/F009/Tests/decline-invite%20error%20--%20should%20show%20participant_not_invited.png)
