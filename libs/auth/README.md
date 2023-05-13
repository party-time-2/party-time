# F011 - Login

This library implements F011 - Login.  
See [F011 Konto anmelden](https://github.com/party-time-2/party-time/issues/11) for more information.

The sequence diagram for this library can be found [here](/docs/F011/F011_kontoAnmelden_seq.plantuml)
![F011_kontoAnmelden_seq](/docs/PNG/F011/F011_kontoAnmelden_seq.png)

The activity diagram for this library can be found [here](/docs/F011/F011_kontoAnmelden_act.plantuml)
![F011_kontoAnmelden_act](/docs/PNG/F011/F011_kontoAnmelden_act.png)

The controller for this library can be found [here](/apps/party-time-backend/src/main/java/com/partytime/api/controller/AuthController.java)

The Test-Cases for this library can be found [here](/apps/party-time-frontend-e2e/src/e2e/login.cy.ts)
![user_required](/docs/PNG/F011/Tests/party-time-login-error%20--%20should%20show%20user_required.png)
![password_required](/docs/PNG/F011/Tests/party-time-login-error%20--%20should%20show%20password_required.png)
![login_error](/docs/PNG/F011/Tests/party-time-login%20--%20should%20show%20login_error.png)
![login_success](/docs/PNG/F011/Tests/party-time-login%20--%20should%20show%20login_success.png)

# F013 - Logout

This library implements F013 - Logout.  
See [F013 Konto abmelden](https://github.com/party-time-2/party-time/issues/13) for more information.

The sequence diagram for this library can be found [here](/docs/F013/F013_kontoAbmelden_seq.plantuml)
![F013_kontoAbmelden_seq](/docs/PNG/F013/F013_kontoAbmelden_seq.png)

The activity diagram for this library can be found [here](/docs/F013/F013_kontoAbmelden_act.plantuml)
![F013_kontoAnmelden_act](/docs/PNG/F013/F013_kontoAnmelden_act.png)

The controller for this library can be found [here](/apps/party-time-backend/src/main/java/com/partytime/api/controller/AuthController.java)

The Test-Cases for this library can be found [here](/apps/party-time-frontend-e2e/src/e2e/logout.cy.ts)
![redirect_to_login](/docs/PNG/F012/Tests/party-time-change%20--%20should%20show%20redirect_to_login.png)
