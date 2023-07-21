export const navigateRegister = () => cy.visit('auth/register');

export const navigateVerify = () => cy.visit('auth/verify');

export const navigateAcceptInvite = () => cy.visit('/invitation/1/accept');

export const navigateDeclineInvite = () => cy.visit('/invitation/1/decline');

export const navigateLogin = () => cy.visit('auth/login');

export const navigateChange = () => cy.visit('account/change');

export const navigateEventOverview = () => cy.visit('event/overview');

export const navigateLogout = () => cy.visit('auth/logout');

export const navigateCreateEvent = () => cy.visit('event/create');

export const navigateChangeEvent = () => cy.visit('event/change/1');

export const navigateDeleteEvent = () => cy.visit('event/delete/1');

export const navigateParticipantsOverview = () =>
  cy.visit('event/participants/1');

export const user_name = () => 'Gustav Gans';

export const user_email = () => 'gustav@gans.de';

export const participant_email = () => 'dagobert@duck.de';

export const verifyToken = () => '3a1a9d22-b693-41d6-9fe6-853fa80266dd';

export const pt_name = () => 'Abschlussfeier von Gustav Gans';

export const short_string = () => 'a';

export const long_string = () => 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';

export const very_long_string = () =>
  'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';

export const pt_addressLine = () => 'Entenstraße 1';

export const pt_zip = () => '12345';

export const pt_city = () => 'Entenhausen';

export const pt_country = () => 'Deutschland';

export const pw_wrong_chars = () => 'aaaaaaaaaaaaa';

export const pw_valid = () => 'Party123123!s';

export const email_required = () => 'Bitte gib deine E-Mail Adresse ein.';

export const pw_required_error = () => 'Bitte gib ein Passwort ein.';

export const pw_short_error = () =>
  'Das Passwort muss mindestens 8 Zeichen lang sein.';

export const pw_long_error = () =>
  'Das Passwort darf maximal 30 Zeichen lang sein.';

export const pw_wrong_chars_error = () =>
  'Das Passwort muss mindestens 1 Sonderzeichen';

export const user_pw_required = () => 'Bitte gib dein Passwort ein.';
export const user_mail_required = () => 'Bitte gib deine E-Mail Adresse ein.';

export const user_short_error = () =>
  'Der Benutzername muss mindestens 5 Zeichen lang sein.';

export const user_long_error = () =>
  'Der Benutzername darf maximal 30 Zeichen lang sein.';

export const user_required_error = () => 'Bitte gib einen Benutzernamen ein.';

export const pt_name_required_error = () =>
  'Bitte gib einen Namen für das Event ein.';

export const pt_name_short_error = () =>
  'Der Eventname muss mindestens 5 Zeichen lang sein.';

export const pt_name_long_error = () =>
  'Der Eventname darf maximal 30 Zeichen lang sein.';

export const pt_address_short_error = () =>
  'Eine gültige Adresse hat mindestens 4 Stellen.';

export const pt_address_long_error = () =>
  'Eine gültige Adresse hat maximal 25 Stellen.';

export const pt_addressLineAddition_long_error = () =>
  'Eine gültiger Adresszusatz hat maximal 25 Stellen.';

export const pt_address_required_error = () =>
  'Bitte gib die Straße und Hausnummer ein, wo das Event stattfinden wird.';

export const pt_zip_required_error = () =>
  'Bitte gib die Postleitzahl ein, wo das Event stattfinden wird.';

export const pt_zip_short_error = () =>
  'Eine gültige Postleitzahl hat 5 Stellen.';

export const pt_zip_long_error = () =>
  'Eine gültige Postleitzahl hat 5 Stellen.';

export const pt_zip_chars_error = () =>
  'Bitte gib eine gültige Postleitzahl ein.';

export const pt_city_required_error = () =>
  'Bitte gib eine Stadt ein, wo das Event stattfinden wird.';

export const pt_city_short_error = () =>
  'Eine gültige Stadt hat mindestens 5 Stellen.';

export const pt_city_long_error = () =>
  'Eine gültige Stadt hat maximal 20 Stellen.';

export const pt_country_required_error = () =>
  'Bitte gib ein Land ein, wo das Event stattfinden wird.';

export const pt_country_short_error = () =>
  'Ein gültiges Land hat mindestens 3 Stellen.';

export const pt_country_long_error = () =>
  'Ein gültiges Land hat maximal 20 Stellen.';

export const api_error_400 = () =>
  'Die Anfrage konnte nicht bearbeitet werden.';

export const participant_email_invalid_error = () =>
  'Bitte gib eine Valide E-Mail Adresse ein. Es wird eine Einladung an diese Adresse gesendet.';

export const account_not_found_error = () =>
  'Es kann kein Account mit dieser E-Mail gefunden werden.';
