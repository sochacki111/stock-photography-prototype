import express, { Application, Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import logger from './util/logger';
import { MONGODB_URI } from './util/secrets';
import * as PhotoController from './controllers/photo';

// Create a new express app instance
const app: express.Application = express();

// Connect to MongoDB
const mongoUrl = String(MONGODB_URI);

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => {
    /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
    logger.debug('DB connected!');
  })
  .catch((err) => {
    logger.fatal(
      `MongoDB connection error. Please make sure MongoDB is running. ${err}`
    );
    process.exit();
  });

// Express configuration
app.set('port', process.env.PORT || 8080);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/photos', PhotoController.findAll);
app.get('/photos/:id', PhotoController.findOne);
app.post('/photos', PhotoController.createOne);
app.patch('/photos/:id', PhotoController.updateOne);
app.delete('/photos/:id', PhotoController.deleteOne);

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('Hello World!');
});

export default app;
