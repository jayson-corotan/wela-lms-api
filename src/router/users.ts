import express from 'express';

import { getAllUsers, deleteUser, updateUser } from '../controllers/users';
import { isAuthenticated, isOwner } from '../middlewares';

export default (router: express.Router) => {
  router.get('/:school/users', isAuthenticated, getAllUsers);
  router.delete('/:school/users/:id', isAuthenticated, isOwner, deleteUser);
  router.patch('/:school/users/:id', isAuthenticated, isOwner, updateUser);
};
