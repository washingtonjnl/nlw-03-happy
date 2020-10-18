/* eslint-disable import/first */
// eslint-disable-next-line import/newline-after-import
import dotenv from 'dotenv';
dotenv.config();

import './database/connection';
import express from 'express';
import 'express-async-errors';
import path from 'path';
import cors from 'cors';

import routes from './routes';
import errorHandler from './errors/handler';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
app.use(errorHandler);

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log(`⚡️ Server started on port ${PORT}`);
});
