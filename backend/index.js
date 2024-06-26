import cors from 'cors';
import {} from 'dotenv/config';
import express from 'express';
import { database } from './src/database/database.js';
import * as routes from './src/routes/index.js';

const PORT = process.env.PORT;
const HOST = process.env.HOST;

const app = express();

await database
  .authenticate()
  .then(() => console.log('Connected to the database...'))
  .catch((err) => console.log(err));

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: '10kb' }));
app.use('/notes', routes.notesRouter);

app.listen(PORT, () => {
  console.log(`Server is runing on ${HOST}:${PORT}`);
});
