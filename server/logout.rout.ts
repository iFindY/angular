import { Response, Request } from 'express';
import { sessionStore } from './session.store';

export function logOut(req: Request, res: Response) {

  // get session id
  const sessionId = req.cookies['SESSIONID'];
  // destroy back end session
  sessionStore.destroySession(sessionId);


 // clear cookie data
  res.clearCookie('SESSIONID');
  res.clearCookie('XSRF-TOKEN');

  // response to client
  res.status(200).json().send();
}
