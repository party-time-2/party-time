export const navigateRegister = () => cy.visit('auth/register');

export const navigateVerify = () => cy.visit('auth/verify');

export const navigateLogin = () => cy.visit('auth/login');

export const navigateChange = () => cy.visit('profile/change');

export const verifyToken = () => '3a1a9d22-b693-41d6-9fe6-853fa80266dd';

export const pw_short = () => 'a';

export const user_short = () => 'a';

export const user_long = () => 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';

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
