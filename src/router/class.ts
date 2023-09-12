import express from 'express';

import { isAuthenticated } from '../middlewares';
import { getClass, getClassList } from '../controllers/class';

export default (router: express.Router) => {
  router.get('/:school/classes', isAuthenticated, getClassList);
  router.get('/:school/class/:class_id', isAuthenticated, getClass);
};
