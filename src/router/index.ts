import express from 'express';

import authentication from './authentication';
import userRoutes from './users';
import classRoutes from './class'
import studentRoutes from './student'
const router = express.Router();

export default (): express.Router => {
  authentication(router);
  userRoutes(router);
  classRoutes(router)
  studentRoutes(router)
  return router;
};
