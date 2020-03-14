import { Request, Response } from 'express';
import { db } from './database';
import { USERS } from './database-data';
import * as argon2 from 'argon2';
import { validatePassword } from './password-validation';
import { createCsrfToken, randomBytes } from './security.utils';
import { sessionStore } from './session.store';
import { ValidationErrors } from '@angular/forms/src/directives/validators';

// take request and response from express handler back end logic
export function createUser(req: Request, res: Response) {


  // get credentials
  const credentials = req.body;

  // validate given password with imported validator module
  const errors: ValidationErrors = validatePassword(credentials.password);

  if (errors.length > 0) {
    res.status(400).json({ errors });
  } else {
    createUserAndSession(res, credentials)
      .catch(() => res.sendStatus(500))
    ;
  }
}

async function createUserAndSession(res: Response, credentials) {
  /** hash the password to make unreadable,
   * the salt is individually generated for each user by the algorithm and stored in the database
   * it generate a salt and hash with a $ delimiter
   * */

  const passwordDigest = await argon2.hash(credentials.password);

  // store user in database
  const user = db.createUser(credentials.email, passwordDigest);

  /**
   * create user sessionID which will be send on each client server interaction
   * the session is an random id which is not guessable and convert to string
   * */
  const sessionId = await randomBytes(32).then(bytes => bytes.toString('hex'));

  const csrfToken = await createCsrfToken(sessionId);
  sessionStore.createSession(sessionId, user);
  res.cookie('XSRF-TOKEN', csrfToken);

  /**
   * create session cookie which is read only and can not be accessed by javascript
   * this one will be the log/pass alternative exchanging client/server
   * httpOnly: no java script can access it
   * secure: send only over https
   *
   * Cross Site Scripting Attack [CSS]: if sessionID is stolen
   */
  res.cookie('SESSIONID', sessionId, { httpOnly: true, secure: true });

  // send back a json type response with given id and email
  res.status(200).json({ id: user.id, email: user.email });
}
