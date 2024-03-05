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
            return environment.api.baseUrl + '/event';
          },
          updateEvent() {
            return environment.api.baseUrl + '/event/';
          },
          createEvent() {
            return environment.api.baseUrl + '/event';
          },
          deleteEvent(eventId: string) {
            return environment.api.baseUrl + '/event/' + eventId;
          },
          getEvent(eventId: string) {
            return environment.api.baseUrl + '/event/' + eventId;
          },
          inviteParticipant(eventId: string, participantEmail: string) {
            return (
              environment.api.baseUrl +
              '/event/' +
              eventId +
              '/participant/' +
              participantEmail
            );
          },
          removeParticipant(eventId: string, participantEmail: string) {
            return (
              environment.api.baseUrl +
              '/event/' +
              eventId +
              '/participant/' +
              participantEmail
            );
          },
          getParticipants(eventId: string) {
            return (
              environment.api.baseUrl + '/event/' + eventId + '/participants'
            );
          },
        },
        participant: {
          declineEvent(eventId: string) {
            return (
              environment.api.baseUrl +
              '/event/participants' +
              eventId +
              'invitation/decline'
            );
          },
          acceptEvent(eventId: string) {
            return (
              environment.api.baseUrl +
              '/event/participants' +
              eventId +
              'invitation/accept'
            );
          },
          getParticipatingEvents() {
            return environment.api.baseUrl + '/event/participants';
          },
          getParticipatingEvent(eventId: string) {
            return environment.api.baseUrl + '/event/participants/' + eventId;
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
