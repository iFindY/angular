import { db } from './database';
import { sessionStore } from './session.store';

export function readAllLessons(req, res) {

  const sessionId = req.cookies['SESSIONID'];
  const isSessionValid = sessionStore.isSessionValid(sessionId);

  if (!isSessionValid) {
    res.sendStatus(403);
  } else {
    let lessons= db.readAllLessons();
    res.status(200).json({lessons});
  }
}
