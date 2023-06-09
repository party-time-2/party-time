# F013 - Change Password

This library implements F013 - Change Password.  
See [F013 Konto ananmelden](https://github.com/party-time-2/party-time/issues/13) for more information.

The sequence diagram for this library can be found [here](/docs/F013/F013_passwortAendern_seq.plantuml)
![F013_passwortAendern_seq.png](/docs/PNG/F013/F013_passwortAendern_seq.png)

The activity diagram for this library can be found [here](/docs/F013/F013_passwortAendern_act.plantuml)
![F013_passwortAendern_act](/docs/PNG/F013/F013_passwortAendern_act.png)

The controller for this library can be found [here](/apps/party-time-backend/src/main/java/com/partytime/api/controller/AuthController.java)

The Test-Cases for this library can be found [here](/apps/party-time-frontend-e2e/src/e2e/change.cy.ts)
![pw_old_required](/docs/PNG/F013/Tests/party-time-change-error%20--%20should%20show%20pw_old_required.png)
![pw_new_required](/docs/PNG/F013/Tests/party-time-change-error%20--%20should%20show%20pw_new_required.png)
![pw_new_short](/docs/PNG/F013/Tests/party-time-change-error%20--%20should%20show%20pw_new_short.png)
![pw_new_long](/docs/PNG/F013/Tests/party-time-change-error%20--%20should%20show%20pw_new_long.png)
![pw_new_wrong_chars](/docs/PNG/F013/Tests/party-time-change-error%20--%20should%20show%20pw_new_wrong_chars.png)
![change_error](/docs/PNG/F013/Tests/party-time-change%20--%20should%20show%20change_error.png)
![change_success](/docs/PNG/F013/Tests/party-time-change%20--%20should%20show%20change_success.png)
