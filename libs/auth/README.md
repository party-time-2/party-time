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

# F012 - Logout

This library implements F012 - Logout.  
See [F012 Konto abmelden](https://github.com/party-time-2/party-time/issues/12) for more information.

The sequence diagram for this library can be found [here](/docs/F012/F012_kontoAbmelden_seq.plantuml)

![F012_kontoAbmelden_seq](/docs/PNG/F012/F012_kontoAbmelden_seq.png)

The activity diagram for this library can be found [here](/docs/F012/F012_kontoAbmelden_act.plantuml)

![F012_kontoAnmelden_act](/docs/PNG/F012/F012_kontoAbmelden_act.png)

The controller for this library can be found [here](/apps/party-time-backend/src/main/java/com/partytime/api/controller/AuthController.java)

The Test-Cases for this library can be found [here](/apps/party-time-frontend-e2e/src/e2e/logout.cy.ts)

![redirect_to_login](/docs/PNG/F012/Tests/party-time-change%20--%20should%20show%20redirect_to_login.png)

# F013 - Change

This library implements F013 - Change.
See [F013 Passwort ändern](https://github.com/party-time-2/party-time/issues/13) for more information.

The sequence diagram for this library can be found [here](/docs/F013/F013_passwortAendern_seq.plantuml)

![F013_passwortAendern_seq](/docs/PNG/F013/F013_passwortAendern_seq.png)

The activity diagram for this library can be found [here](/docs/F013/F013_passwortAendern_act.plantuml)

![F013_passwortAendern_act](/docs/PNG/F013/F013_passwortAendern_act.png)

The controller for this library can be found [here](/apps/party-time-backend/src/main/java/com/partytime/api/controller/AuthController.java)

The Test-Cases for this library can be found [here](/apps/party-time-frontend-e2e/src/e2e/change.cy.ts)

![change_error](/docs/PNG/F013/Tests/party-time-change%20--%20should%20show%20change_error.png)
![change_success](/docs/PNG/F013/Tests/party-time-change%20--%20should%20show%20change_success.png)
![pw_new_long](/docs/PNG/F013/Tests/party-time-change-error%20--%20should%20show%20pw_new_long.png)
![pw_new_required](/docs/PNG/F013/Tests/party-time-change-error%20--%20should%20show%20pw_new_required.png)
![pw_new_short](/docs/PNG/F013/Tests/party-time-change-error%20--%20should%20show%20pw_new_short.png)
![pw_new_wrong_chars](/docs/PNG/F013/Tests/party-time-change-error%20--%20should%20show%20pw_new_wrong_chars.png)
![pw_old_required](/docs/PNG/F013/Tests/party-time-change-error%20--%20should%20show%20pw_old_required.png)
