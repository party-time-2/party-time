# F014 - Verify

This library implements F014 - Verify.  
See [F014 Konto verifizieren](https://github.com/party-time-2/party-time/issues/14) for more information.

The sequence diagram for this library can be found [here](/docs/F014/F014_kontoVerifizieren_seq.plantuml)
![F014_kontoVerifizieren_seq](/docs/PNG/F014/F014_kontoVerifizieren_seq.png)

The activity diagram for this library can be found [here](/docs/F014/F014_kontoVerifizieren_act.plantuml)
![F014_kontoVerifizieren_act](/docs/PNG/F010/F010_kontoVerifizieren_act.png)

The controller for this library can be found [here](/apps/party-time-backend/src/main/java/com/partytime/api/controller/AuthController.java)

The Test-Cases for this library can be found [here](/apps/party-time-frontend-e2e/src/e2e/verify.cy.ts)
![token_required](/docs/PNG/F014/Tests/party-time-verify-error-token%20--%20should%20show%20token_required.png)
![token_invalid](/docs/PNG/F014/Tests/party-time-verify-error-token%20--%20should%20show%20token_invalid.png)
![verify_error](/docs/PNG/F014/Tests/party-time-verify%20--%20should%20show%20verify_error.png)
![verify_success](/docs/PNG/F014/Tests/party-time-verify%20--%20should%20show%20verify_success.png)
