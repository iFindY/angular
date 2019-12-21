import { Response, Request } from 'express';
import { sessionStore } from './session.store';

export function logOut(req: Request, res: Response) {
  const sessionId = req.cookies['SESSIONID'];
  sessionStore.destroySession(sessionId);
  res.clearCookie('SESSIONID');
  res.clearCookie('XSRF-TOKEN');
  res.status(200).json().send();
}
