export const environment = {
  api:
    {
      baseUrl: 'http://localhost:8090/api',
      endpoints: {
        authentication: {
          login: '/auth/login',
          register: '/auth/register',
          verifyEmail: '/auth/verify',
        },
        account: {
          delete: '/account/delete',
          change: "/auth/change",
        },
        event: '/api/event',
      }
    }
};
