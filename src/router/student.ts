import express from 'express';

import { isAuthenticated } from '../middlewares';
import { getStudent, getStudentList } from '../controllers/student';

export default (router: express.Router) => {
  router.get('/:school/students', isAuthenticated, getStudentList);
  router.get('/:school/student/:student_id', isAuthenticated, getStudent);
};
