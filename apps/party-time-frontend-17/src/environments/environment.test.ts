import { environment } from './environment';

describe('Environment', () => {
  it('should have the correct API base URL', () => {
    expect(environment.api.baseUrl).toBe('http://localhost:8090/api');
  });

  describe('Authentication Endpoints', () => {
    it('should return the correct login URL', () => {
      expect(environment.api.endpoints.authentication.login()).toBe(
        'http://localhost:8090/api/auth/login'
      );
    });

    it('should return the correct register URL', () => {
      expect(environment.api.endpoints.account.register()).toBe(
        'http://localhost:8090/api/account'
      );
    });

    it('should return the correct verify URL', () => {
      const token = 'abc123';
      expect(environment.api.endpoints.authentication.verify(token)).toBe(
        'http://localhost:8090/api/auth/verify/abc123'
      );
    });
  });

  describe('Account Endpoints', () => {
    it('should return the correct change password URL', () => {
      expect(environment.api.endpoints.account.changePassword()).toBe(
        'http://localhost:8090/api/account/pwchange'
      );
    });

    it('should return the correct delete account URL', () => {
      expect(environment.api.endpoints.account.delete()).toBe(
        'http://localhost:8090/api/account'
      );
    });
  });

  describe('Event Endpoints', () => {
    describe('Host Endpoints', () => {
      it('should return the correct get organized events URL', () => {
        expect(environment.api.endpoints.event.host.getOrganizedEvents()).toBe(
          'http://localhost:8090/api/host/events'
        );
      });

      it('should return the correct update event URL', () => {
        expect(environment.api.endpoints.event.host.updateEvent()).toBe(
          'http://localhost:8090/api/host/event'
        );
      });

      it('should return the correct create event URL', () => {
        expect(environment.api.endpoints.event.host.createEvent()).toBe(
          'http://localhost:8090/api/host/event'
        );
      });

      it('should return the correct delete event URL', () => {
        const eventId = '123';
        expect(environment.api.endpoints.event.host.deleteEvent(eventId)).toBe(
          'http://localhost:8090/api/host/event/123'
        );
      });

      it('should return the correct get event URL', () => {
        const eventId = '123';
        expect(environment.api.endpoints.event.host.getEvent(eventId)).toBe(
          'http://localhost:8090/api/host/event/123'
        );
      });

      it('should return the correct invite participant URL', () => {
        const eventId = '123';
        expect(
          environment.api.endpoints.event.host.inviteParticipant(eventId)
        ).toBe(
          'http://localhost:8090/api/host/event/' + eventId + '/participants'
        );
      });

      it('should return the correct remove participant URL', () => {
        const eventId = '123';
        const participantEmail = 'test@example.com';
        expect(
          environment.api.endpoints.event.host.removeParticipant(
            eventId,
            participantEmail
          )
        ).toBe(
          'http://localhost:8090/api/host/event/123/participants/test@example.com'
        );
      });

      it('should return the correct get participants URL', () => {
        const eventId = '123';
        expect(
          environment.api.endpoints.event.host.getParticipants(eventId)
        ).toBe('http://localhost:8090/api/host/event/123/participants');
      });
    });

    describe('Participant Endpoints', () => {
      it('should return the correct decline event URL', () => {
        const eventId = '123';
        expect(
          environment.api.endpoints.event.participant.declineEvent(eventId)
        ).toBe(
          'http://localhost:8090/api/participant/event/123/invitation/decline'
        );
      });

      it('should return the correct accept event URL', () => {
        const eventId = '123';
        expect(
          environment.api.endpoints.event.participant.acceptEvent(eventId)
        ).toBe(
          'http://localhost:8090/api/participant/event/123/invitation/accept'
        );
      });

      it('should return the correct get participating events URL', () => {
        expect(
          environment.api.endpoints.event.participant.getParticipatingEvents()
        ).toBe('http://localhost:8090/api/participant/events');
      });

      it('should return the correct get participating event URL', () => {
        const eventId = '123';
        expect(
          environment.api.endpoints.event.participant.getParticipatingEvent(
            eventId
          )
        ).toBe('http://localhost:8090/api/participant/event/' + eventId);
      });
    });
  });

  it('should have the correct storage key', () => {
    expect(environment.storage.key).toBe('auth_token');
  });

  it('should have the correct login page', () => {
    expect(environment.pages.login).toBe('login');
  });
});
