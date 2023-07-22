import { CONFLICT_STATUS } from '../utils/constants.js';

class Conflict extends Error {
  constructor(message) {
    super(message);
    this.statusCode = CONFLICT_STATUS;
  }
}

export { Conflict };
