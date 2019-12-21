import { Request, Response } from 'express';
import { db } from './database';
import { DbUser } from './db-user';
import *  as argon2 from 'argon2';
import { createCsrfToken, randomBytes } from './security.utils';
import { sessionStore } from './session.store';

export function logIn(req: Request, res: Response) {
  const credentials = req.body;
  const user = db.findUserByEmail(credentials.email);
  if (!user) {
    res.sendStatus(403);
  } else {
    LoginAndBuildResponse(credentials, user, res);
  }
}

async function LoginAndBuildResponse(credentials: any, user: DbUser, res: Response) {
  try {
    const sessionId = await attemptLogin(credentials, user);
    console.log('Login successful');
    const csrfToken = createCsrfToken(sessionId);
    res.cookie('XSRF-TOKEN', csrfToken);
    res.cookie('SESSIONID', sessionId, { httpOnly: true, secure: true });
    res.status(200).json({ id: user.id, email: user.email });
  } catch (e) {
    console.log('Login fail');

    res.sendStatus(403);
  }
}

async function attemptLogin(credentials: any, user: DbUser) {
  const isPasswordValid = await argon2.verify(user.passwordDigest, credentials.password);

  if (!isPasswordValid) {
    throw new Error('wrong');
  }

  const sessionId = await randomBytes(32).then(bytes => bytes.toString('hex'));
  sessionStore.createSession(sessionId, user);
  return sessionId;
}
