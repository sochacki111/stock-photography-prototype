import { Router } from 'express';
import passport from 'passport';

import * as PhotoController from '../controllers/photo.controller';
import jwtAuth from '../middlewares/auth';

const router = Router();

router.get('/photos', jwtAuth, PhotoController.findAll);
router.get('/photos/:id', PhotoController.findOne);
router.post('/photos', jwtAuth, PhotoController.createOne);
router.patch(
  '/photos/:id',
  passport.authenticate('jwt', { session: false }),
  PhotoController.updateOne
);
router.delete(
  '/photos/:id',
  passport.authenticate('jwt', { session: false }),
  PhotoController.deleteOne
);

export default router;