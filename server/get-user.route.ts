import { sessionStore } from './session.store';
import { Response, Request } from 'express';

export function getUser(req: Request, res: Response) {
  // get user session from request cookie
  const sessionId = req.cookies['SESSIONID'];
  // search session store for id
  const user = sessionStore.findUserBySessionId(sessionId);

  // if user exists return session id for user else return
  if (user) {
    res.status(200).json(user);
  } else {
    // good request but no content found
    res.sendStatus(204);
  }

}
