import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import { errors } from 'celebrate';
import { requestLogger, errorLogger } from './middlewares/logger.js';
import { limiter } from './middlewares/limiter.js';
import { index as routes } from './routes/index.js';
import {
  DATABASE_URL, PORT, INTERNAL_SERVER_ERROR_STATUS, INTERNAL_SERVER_ERROR_MESSAGE,
} from './utils/constants.js';

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

app.use(limiter);

app.use(express.json());

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
