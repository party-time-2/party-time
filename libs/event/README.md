# F001 - Create Event

This library implements F001 - Create Event.  
See [F001 Konto anmelden](https://github.com/party-time-2/party-time/issues/1) for more information.

The sequence diagram for this library can be found [here](/docs/F001/F001_eventAnlegen_seq.plantuml)
![F001_kontoAnmelden_seq](/docs/PNG/F001/F001_eventAnlegen_seq.png)

The activity diagram for this library can be found [here](/docs/F001/F001_eventAnlegen_act.plantuml)
![F001_kontoAnmelden_act](/docs/PNG/F001/F001_eventAnlegen_act.png)

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
![prty_create_error](/docs/PNG/F001/Tests/create-event-error%20--%20should%20show%20party_create_error.png))
![create_success](/docs/PNG/F001/Tests/create-event%20--%20should%20show%20create_success.png)
