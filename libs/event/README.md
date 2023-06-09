# [Milestone 2 - Eventfunktionalität (Veranstalter)](https://github.com/party-time-2/party-time/milestone/2)

## F001 - Create Event

This library implements F001 - Create Event.  
See [F001 Events anlegen](https://github.com/party-time-2/party-time/issues/1) for more information.

The sequence diagram for this library can be found [here](/docs/F001/F001_eventAnlegen_seq.plantuml)

![F001_eventAnlegen_seq](/docs/PNG/F001/F001_eventAnlegen_seq.png)

The activity diagram for this library can be found [here](/docs/F001/F001_eventAnlegen_act.plantuml)

![F001_eventAnlegen_act](/docs/PNG/F001/F001_eventAnlegen_act.png)

The controller for this library can be found [here](/apps/party-time-backend/src/main/java/com/partytime/api/controller/EventController.java)

The Test-Cases for this library can be found [here](/apps/party-time-frontend-e2e/src/e2e/create.event.cy.ts)

![name_required](/docs/PNG/F001/Tests/create-event-error%20--%20should%20show%20party_name_required.png)
![name_short](/docs/PNG/F001/Tests/create-event-error%20--%20should%20show%20party_name_short.png)
![name_long](/docs/PNG/F001/Tests/create-event-error%20--%20should%20show%20party_name_long.png)
![address_required](/docs/PNG/F001/Tests/create-event-error%20--%20should%20show%20party_address_required.png)
![address_long](/docs/PNG/F001/Tests/create-event-error%20--%20should%20show%20party_address_long.png)
![address_short](/docs/PNG/F001/Tests/create-event-error%20--%20should%20show%20party_address_short.png)
![city_required](/docs/PNG/F001/Tests/create-event-error%20--%20should%20show%20party_city_required.png)
![city_long](/docs/PNG/F001/Tests/create-event-error%20--%20should%20show%20party_city_long.png)
![city_short](/docs/PNG/F001/Tests/create-event-error%20--%20should%20show%20party_city_short.png)
![counrty_required](/docs/PNG/F001/Tests/create-event-error%20--%20should%20show%20party_county_required.png)
![country_long](/docs/PNG/F001/Tests/create-event-error%20--%20should%20show%20party_country_long.pngg)
![country_short](/docs/PNG/F001/Tests/create-event-error%20--%20should%20show%20party_country_short.png)
![zip_required](/docs/PNG/F001/Tests/create-event-error%20--%20should%20show%20party_zip_required.png)
![zip_long](/docs/PNG/F001/Tests/create-event-error%20--%20should%20show%20party_zip_long.png)
![zip_short](/docs/PNG/F001/Tests/create-event-error%20--%20should%20show%20party_zip_short.png)
![prty_create_error](/docs/PNG/F001/Tests/create-event-error%20--%20should%20show%20party_create_error.png)
![create_success](/docs/PNG/F001/Tests/create-event%20--%20should%20show%20create_success.png)

## F002 - Edit Event

This library implements F002 - edit Event.  
See [F002 Event bearbeiten](https://github.com/party-time-2/party-time/issues/2) for more information.

The sequence diagram for this library can be found [here](/docs/F002/F002_eventsBearbeiten_seq.plantuml)

![F002_eventsBearbeiten_seq](/docs/PNG/F002/F002_eventsBearbeiten_seq.png)

The activity diagram for this library can be found [here](/docs/F002/F002_eventsBearbeiten_act.plantuml)

![F002_eventsBearbeiten_act](/docs/PNG/F002/F002_eventsBearbeiten_act.png)

The controller for this library can be found [here](/apps/party-time-backend/src/main/java/com/partytime/api/controller/EventController.java)

The Test-Cases for this library can be found [here](/apps/party-time-frontend-e2e/src/e2e/change.event.cy.ts)

![name_required](/docs/PNG/F002/Tests/change-event-error%20--%20should%20show%20party_name_required.png)
![name_short](/docs/PNG/F002/Tests/change-event-error%20--%20should%20show%20party_name_short.png)
![name_long](/docs/PNG/F002/Tests/change-event-error%20--%20should%20show%20party_name_long.png)
![address_required](/docs/PNG/F002/Tests/change-event-error%20--%20should%20show%20party_address_required.png)
![address_long](/docs/PNG/F002/Tests/change-event-error%20--%20should%20show%20party_address_long.png)
![address_short](/docs/PNG/F002/Tests/change-event-error%20--%20should%20show%20party_address_short.png)
![city_required](/docs/PNG/F002/Tests/change-event-error%20--%20should%20show%20party_city_required.png)
![city_long](/docs/PNG/F002/Tests/change-event-error%20--%20should%20show%20party_city_long.png)
![city_short](/docs/PNG/F002/Tests/change-event-error%20--%20should%20show%20party_city_short.png)
![counrty_required](/docs/PNG/F002/Tests/change-event-error%20--%20should%20show%20party_county_required.png)
![country_long](/docs/PNG/F002/Tests/change-event-error%20--%20should%20show%20party_country_long.pngg)
![country_short](/docs/PNG/F002/Tests/change-event-error%20--%20should%20show%20party_country_short.png)
![zip_required](/docs/PNG/F002/Tests/change-event-error%20--%20should%20show%20party_zip_required.png)
![zip_long](/docs/PNG/F002/Tests/change-event-error%20--%20should%20show%20party_zip_long.png)
![zip_short](/docs/PNG/F002/Tests/change-event-error%20--%20should%20show%20party_zip_short.png)
![party_change_error](/docs/PNG/F002/Tests/change-event-error%20--%20should%20show%20party_change_error.png)
![change_success](/docs/PNG/F002/Tests/change-event%20--%20should%20show%20change_success.png)

## F003 - Delete Event

This library implements F003 - delete Event.
See [F003 Event löschen](https://github.com/party-time-2/party-time/issues/3) for more information.

The sequence diagram for this library can be found [here](/docs/F003/F003_eventsLoeschen_seq.plantuml)

![F003_eventsLoeschen_seq](/docs/PNG/F003/F003_eventsLoeschen_seq.png)

The activity diagram for this library can be found [here](/docs/F003/F003_eventsLoeschen_act.plantuml)

![F003_eventsLoeschen_act](/docs/PNG/F003/F003_eventsLoeschen_act.png)

The controller for this library can be found [here](/apps/party-time-backend/src/main/java/com/partytime/api/controller/EventController.java)

The Test-Cases for this library can be found [here](/apps/party-time-frontend-e2e/src/e2e/delete.event.cy.ts)

![delete_event_error](/docs/PNG/F003/Tests/delete-event-error%20--%20should%20show%20delete-event-error.png)

![delete_event_success](/docs/PNG/F003/Tests/delete-event-success%20--%20should%20show%20delete-event-success.png)

## F016 - Event Overview

This library implements F016 - Overview Event.  
See [F016 Events überblicken](https://github.com/party-time-2/party-time/issues/16) for more information.

The sequence diagram for this library can be found [here](/docs/F016/F016_eventsUeberblicken_seq.plantuml)

![F016_eventÜberblicken_seq](/docs/PNG/F016/F016_eventsUeberblicken_seq.png)

The activity diagram for this library can be found [here](/docs/F016/F016_eventsUeberblicken_act.plantuml)  
![F016_eventÜberblicken_act](/docs/PNG/F016/F016_eventsUeberblicken_act.png)

The controller for this library can be found [here](/apps/party-time-backend/src/main/java/com/partytime/api/controller/EventController.java)

The Test-Case for this library can be found [here](/apps/party-time-frontend-e2e/src/e2e/overview.cy.ts)  
![show_events](/docs/PNG/F016/Tests/party-time-overview-events%20--%20should%20show%20events.png)
