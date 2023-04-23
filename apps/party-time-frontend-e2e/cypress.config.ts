import { defineConfig } from 'cypress';
import { nxE2EPreset } from '@nrwl/cypress/plugins/cypress-preset';

export default defineConfig({
  projectId: 'tqvzz3',
  e2e: {
    ...nxE2EPreset(__dirname),
    // supportFolder: 'apps/party-time-frontend-e2e/src/support',
    // supportFile: false,
    supportFile: false,
  },
});
