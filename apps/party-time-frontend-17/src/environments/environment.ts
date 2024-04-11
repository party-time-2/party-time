export const environment = {
  api: {
    baseUrl: 'http://localhost:8090/api',
    endpoints: {
      account: {
        register() {
          return environment.api.baseUrl + '/account';
        },
        delete() {
          return environment.api.baseUrl + '/account';
        },
        changePassword() {
          return environment.api.baseUrl + '/account/pwchange';
        },
      },
      authentication: {
        login() {
          return environment.api.baseUrl + '/auth/login';
        },
        verify(code: string) {
          return environment.api.baseUrl + '/auth/verify?token=' + code;
        },
      },
      event: {
        host: {
          getOrganizedEvents() {
            return environment.api.baseUrl + '/host/events';
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
              eventId.toString() +
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
              '/invitation/decline'
            );
          },
          acceptEvent(eventId: string) {
            return (
              environment.api.baseUrl +
              '/participant/event/' +
              eventId +
              '/invitation/accept'
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
};
