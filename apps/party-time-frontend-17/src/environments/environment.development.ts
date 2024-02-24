export const environment = {
  api: {
    baseUrl: 'http://localhost:8090/api',
    endpoints: {
      authentication: {
        login() {
          return environment.api.baseUrl + '/auth/login';
        },
        register() {
          return environment.api.baseUrl + '/auth/register';
        },
        verify(token: string) {
          return environment.api.baseUrl + '/auth/verify/' + token;
        },
      },
    },
  },
  storage: {
    key: 'auth_token',
  },
  pages: {
    login: 'login',
  },
};
