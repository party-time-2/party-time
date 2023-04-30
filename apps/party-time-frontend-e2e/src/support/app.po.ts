export const navigateRegister = () => cy.visit('/register');

export const verifyToken = () => '3a1a9d22-b693-41d6-9fe6-853fa80266dd';

export const navigateVerify = () => cy.visit('/verify');

export const navigateLogin = () => cy.visit('auth/login');
