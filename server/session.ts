import { Moment } from 'moment';
import { User } from '../src/app/model/user';
import moment = require('moment');

// session Object
export class Session {

  static readonly VALID_MINUTE = 2;
  private readonly validUntil: Moment;

  constructor(public sessionId: string, public user: User) {
    this.validUntil = moment().add(Session.VALID_MINUTE, 'minutes');
  }

  isValid() {
    return moment().diff(this.validUntil, 'minutes') <= 0;
  }
}
