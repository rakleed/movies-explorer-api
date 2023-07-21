const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { limiter } = require('./middlewares/limiter');
const routes = require('./routes');
const {
  DATABASE_URL, PORT, INTERNAL_SERVER_ERROR_STATUS, INTERNAL_SERVER_ERROR_MESSAGE,
} = require('./utils/constants');

const app = express();

mongoose.connect(DATABASE_URL);

const corsOptions = {
  origin: [
    // 'http://localhost:3000',
    // 'http://localhost:3001',
    'http://movies-explorer-rkld.nomoredomains.xyz',
    'https://movies-explorer-rkld.nomoredomains.xyz',
  ],
};

app.use(cors(corsOptions));

app.use(helmet());

app.use(requestLogger);

app.use(express.json());

// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 100,
//   standardHeaders: true,
//   legacyHeaders: false,
// });

app.use(limiter);

app.use(routes);

app.use(errorLogger);
app.use(errors());
app.use((err, req, res, next) => {
  const {
    statusCode = INTERNAL_SERVER_ERROR_STATUS,
    message = INTERNAL_SERVER_ERROR_MESSAGE,
  } = err;
  res.status(statusCode).send({ message });
  next();
});

app.listen(PORT);
