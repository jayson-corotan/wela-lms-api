import express from 'express';

import { login, register } from '../controllers/authentication';

export default (router: express.Router) => {
  router.post('/:school/auth/register', register);
  router.post('/:school/auth/login', login);
};
