import { Session } from './session';
import { User } from '../src/app/model/user';

class SessionStore {
  /** sessions map containing all sessions
   * this can be queried by the map key
   */
  private sessions: { [key: string]: Session } = {};

  createSession(sessionId: string, user: User) {
    this.sessions[sessionId] = new Session(sessionId, user);
  }

  // return sessionID ony if prepend and is valid
  findUserBySessionId(sessionId: string): User | undefined {
    const session = this.sessions[sessionId];

    return this.isSessionValid(sessionId) ? session.user : undefined;
  }

  destroySession(sessionId: string) {
    // destroy session from session store
    delete this.sessions[sessionId];
  }


  isSessionValid(sessionId: string) {
    const session = this.sessions[sessionId];
    return session && session.isValid();

  }
}

export const sessionStore = new SessionStore();
