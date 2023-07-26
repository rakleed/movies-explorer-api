import { NOT_FOUND_STATUS } from '../utils/constants.js';

class NotFound extends Error {
  constructor(message) {
    super(message);
    this.statusCode = NOT_FOUND_STATUS;
  }
}

export { NotFound };
