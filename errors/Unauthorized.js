import { UNAUTHORIZED_STATUS } from '../utils/constants.js';

class Unauthorized extends Error {
  constructor(message) {
    super(message);
    this.statusCode = UNAUTHORIZED_STATUS;
  }
}

export { Unauthorized };
