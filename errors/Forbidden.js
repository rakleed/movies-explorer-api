import { FORBIDDEN_STATUS } from '../utils/constants.js';

class Forbidden extends Error {
  constructor(message) {
    super(message);
    this.statusCode = FORBIDDEN_STATUS;
  }
}

export { Forbidden };
