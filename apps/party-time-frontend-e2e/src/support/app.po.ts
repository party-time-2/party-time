export const navigateRegister = () => cy.visit('auth/register');

export const navigateVerify = () => cy.visit('auth/verify');

export const navigateLogin = () => cy.visit('auth/login');

export const navigateChange = () => cy.visit('account/change');

export const navigateLogout = () => cy.visit('auth/logout');

export const navigateCreateEvent = () => cy.visit('event/create');

export const verifyToken = () => '3a1a9d22-b693-41d6-9fe6-853fa80266dd';

export const pw_short = () => 'a';

export const pt_name_short = () => 'a';

export const user_short = () => 'a';

export const user_long = () => 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';

export const pt_name_long = () => 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';

export const pw_long = () => 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';

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
