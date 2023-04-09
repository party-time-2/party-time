const { createGlobPatternsForDependencies } = require('@nrwl/angular/tailwind');
const { join } = require('path');

function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`;
    }
    return `rgb(var(${variableName}))`;
  };
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      /* light */
      'primary-light': withOpacity('--primary-light'),
      'on-primary-light': withOpacity('--on-primary-light'),
      'primary-container-light': withOpacity('--primary-container-light'),
      'on-primary-container-light': withOpacity('--on-primary-container-light'),
      'secondary-light': withOpacity('--secondary-light'),
      'on-secondary-light': withOpacity('--on-secondary-light'),
      'secondary-container-light': withOpacity('--secondary-container-light'),
      'on-secondary-container-light': withOpacity(
        '--on-secondary-container-light'
      ),
      'tertiary-light': withOpacity('--tertiary-light'),
      'on-tertiary-light': withOpacity('--on-tertiary-light'),
      'tertiary-container-light': withOpacity('--tertiary-container-light'),
      'on-tertiary-container-light': withOpacity(
        '--on-tertiary-container-light'
      ),
      'error-light': withOpacity('--error-light'),
      'error-container-light': withOpacity('--error-container-light'),
      'on-error-light': withOpacity('--on-error-light'),
      'on-error-container-light': withOpacity('--on-error-container-light'),
      'background-light': withOpacity('--background-light'),
      'on-background-light': withOpacity('--on-background-light'),
      'surface-light': withOpacity('--surface-light'),
      'on-surface-light': withOpacity('--on-surface-light'),
      'surface-variant-light': withOpacity('--surface-variant-light'),
      'on-surface-variant-light': withOpacity('--on-surface-variant-light'),
      'outline-light': withOpacity('--outline-light'),
      'inverse-on-surface-light': withOpacity('--inverse-on-surface-light'),
      'inverse-surface-light': withOpacity('--inverse-surface-light'),
      'inverse-primary-light': withOpacity('--inverse-primary-light'),
      'shadow-light': withOpacity('--shadow-light'),
      'surface-tint-light': withOpacity('--surface-tint-light'),
      'outline-variant-light': withOpacity('--outline-variant-light'),
      'scrim-light': withOpacity('--scrim-light'),
      /* dark */
      'primary-dark': withOpacity('--primary-dark'),
      'on-primary-dark': withOpacity('--on-primary-dark'),
      'primary-container-dark': withOpacity('--primary-container-dark'),
      'on-primary-container-dark': withOpacity('--on-primary-container-dark'),
      'secondary-dark': withOpacity('--secondary-dark'),
      'on-secondary-dark': withOpacity('--on-secondary-dark'),
      'secondary-container-dark': withOpacity('--secondary-container-dark'),
      'on-secondary-container-dark': withOpacity(
        '--on-secondary-container-dark'
      ),
      'tertiary-dark': withOpacity('--tertiary-dark'),
      'on-tertiary-dark': withOpacity('--on-tertiary-dark'),
      'tertiary-container-dark': withOpacity('--tertiary-container-dark'),
      'on-tertiary-container-dark': withOpacity('--on-tertiary-container-dark'),
      'error-dark': withOpacity('--error-dark'),
      'error-container-dark': withOpacity('--error-container-dark'),
      'on-error-dark': withOpacity('--on-error-dark'),
      'on-error-container-dark': withOpacity('--on-error-container-dark'),
      'background-dark': withOpacity('--background-dark'),
      'on-background-dark': withOpacity('--on-background-dark'),
      'surface-dark': withOpacity('--surface-dark'),
      'on-surface-dark': withOpacity('--on-surface-dark'),
      'surface-variant-dark': withOpacity('--surface-variant-dark'),
      'on-surface-variant-dark': withOpacity('--on-surface-variant-dark'),
      'outline-dark': withOpacity('--outline-dark'),
      'inverse-on-surface-dark': withOpacity('--inverse-on-surface-dark'),
      'inverse-surface-dark': withOpacity('--inverse-surface-dark'),
      'inverse-primary-dark': withOpacity('--inverse-primary-dark'),
      'shadow-dark': withOpacity('--shadow-dark'),
      'surface-tint-dark': withOpacity('--surface-tint-dark'),
      'outline-variant-dark': withOpacity('--outline-variant-dark'),
      'scrim-dark': withOpacity('--scrim-dark'),
    },
  },
  darkMode: 'media', // or 'media' or 'class'
  plugins: [],
};
