import { NextFunction, Response, Request } from 'express';
import { el } from '@angular/platform-browser/testing/src/browser_util';

export function checkCsrfToken(req: Request, res: Response, next: NextFunction) {
  const csrfToken: string = req.cookies['XSRF-TOKEN'];
  const csrfHeader: string = req.header('x-csrf-token');

  if (csrfToken && csrfHeader && csrfToken === (csrfHeader)) {
    next();
  } else {
    res.sendStatus(403);
  }
}
