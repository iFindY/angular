import { Session } from './session';
import { User } from '../src/app/model/user';

class SessionStore {
  private session: { [key: string]: Session } = {};

  createSession(sessionId: string, user: User) {
    this.session[sessionId] = new Session(sessionId, user);
  }

  findUserBySessionId(sessionId: string): User | undefined {
    const session = this.session[sessionId];
    const isSessionValid: boolean = session && session.isValid();
    return isSessionValid ? session.user : undefined;
  }

  destroySession(sessionId: string) {
    delete this.session[sessionId];
  }
}

export const sessionStore = new SessionStore();
