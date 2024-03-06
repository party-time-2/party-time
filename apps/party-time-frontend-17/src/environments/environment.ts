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
        verify(code: string) {
          return environment.api.baseUrl + '/auth/verify/' + code;
        },
      },
      account: {
        changePassword() {
          return environment.api.baseUrl + '/account/change';
        },
        deleteAccount() {
          return environment.api.baseUrl + '/account/delete';
        },
      },
      event: {
        host: {
          getOrganizedEvents() {
            return environment.api.baseUrl + '/host/event';
          },
          updateEvent() {
            return environment.api.baseUrl + '/host/event';
          },
          createEvent() {
            return environment.api.baseUrl + '/host/event';
          },
          deleteEvent(eventId: string) {
            return environment.api.baseUrl + '/host/event/' + eventId;
          },
          getEvent(eventId: string) {
            return environment.api.baseUrl + '/host/event/' + eventId;
          },
          inviteParticipant(eventId: string) {
            return (
              environment.api.baseUrl +
              '/host/event/' +
              eventId +
              '/participants'
            );
          },
          removeParticipant(eventId: string, invideId: string) {
            return (
              environment.api.baseUrl +
              '/host/event/' +
              eventId +
              '/participants/' +
              invideId
            );
          },
          getParticipants(eventId: string) {
            return (
              environment.api.baseUrl +
              '/host/event/' +
              eventId +
              '/participants'
            );
          },
        },
        participant: {
          declineEvent(eventId: string) {
            return (
              environment.api.baseUrl +
              '/participant/event/' +
              eventId +
              'invitation/decline'
            );
          },
          acceptEvent(eventId: string) {
            return (
              environment.api.baseUrl +
              '/participant/event' +
              eventId +
              'invitation/accept'
            );
          },
          getParticipatingEvents() {
            return environment.api.baseUrl + '/participant/events';
          },
          getParticipatingEvent(eventId: string) {
            return environment.api.baseUrl + '/participant/event/' + eventId;
          },
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
