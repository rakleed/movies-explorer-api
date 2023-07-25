import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import { Unauthorized } from '../errors/Unauthorized.js';
import { UNAUTHORIZED_MESSAGE_USER } from '../utils/constants.js';

const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: (props) => `${props.value} — невалидный email!`,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 30,
  },
});

userSchema.statics.findUserByCredentials = function findByCredits(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Unauthorized(UNAUTHORIZED_MESSAGE_USER));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Unauthorized(UNAUTHORIZED_MESSAGE_USER));
          }
          return user;
        });
    });
};

export const User = mongoose.model('user', userSchema);
