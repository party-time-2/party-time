# F010 - Register

This library implements F010 - Register.  
See [F010 Konto anlegen](https://github.com/party-time-2/party-time/issues/10) for more information.

The sequence diagram for this library can be found [here](/docs/F010/F010_kontoErstellen_seq.plantuml)
![F010_kontoErstellen_seq](/docs/PNG/F010/F010_kontoErstellen_seq.png)

The activity diagram for this library can be found [here](/docs/F010/F010_kontoErstellen_act.plantuml)
![F010_kontoErstellen_act](/docs/PNG/F010/F010_kontoErstellen_act.png)

The controller for this library can be found [here](/apps/party-time-backend/src/main/java/com/partytime/api/controller/AuthController.java)

The Test-Cases for this library can be found [here](/apps/party-time-frontend-e2e/src/e2e/register.cy.ts)
![user_too_short](/docs/PNG/F010/Tests/party-time-register-error-user%20--%20should%20show%20user_too_short.png)
![user_too_long](/docs/PNG/F010/Tests/party-time-register-error-user%20--%20should%20show%20user_too_long.png)
![user_required](/docs/PNG/F010/Tests/party-time-register-error-user%20--%20should%20show%20user_required.png)
![pw_short](/docs/PNG/F010/Tests/party-time-register-error-pw%20--%20should%20show%20pw_short.png)
![pw_long](/docs/PNG/F010/Tests/party-time-register-error-pw%20--%20should%20show%20pw_long.png)
![pw_required](/docs/PNG/F010/Tests/party-time-register-error-pw%20--%20should%20show%20pw_required.png)
![mail_invalid](/docs/PNG/F010/Tests/party-time-register-error-mail%20--%20should%20show%20mail_invalid.png)
![mail_required](/docs/PNG/F010/Tests/party-time-register-error-mail%20--%20should%20show%20mail_required.png)
![mail_in_use](/docs/PNG/F010/Tests/party-time-register%20--%20should%20show%20mail_in_use.png)
![register_success](/docs/PNG/F010/Tests/party-time-register%20--%20should%20show%20registration_success.png)
