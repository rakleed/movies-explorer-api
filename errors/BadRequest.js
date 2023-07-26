import { BAD_REQUEST_STATUS } from '../utils/constants.js';

class BadRequest extends Error {
  constructor(message) {
    super(message);
    this.statusCode = BAD_REQUEST_STATUS;
  }
}

export { BadRequest };
