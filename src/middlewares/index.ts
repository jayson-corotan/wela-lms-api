import express from 'express';
import { merge, get } from 'lodash';

import { getUserById, getUserBySessionToken } from '../db/users'; 
import { userAuth } from './jwt';

export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const payload:any = await userAuth(req.headers.authorization)
    if (!payload) {
      return res.sendStatus(403);
    }
    // const sessionToken = req.cookies['ANTONIO-AUTH'];
    // if (!sessionToken) {
    //   return res.sendStatus(403);
    // }
    // const existingUser = await getUserBySessionToken(sessionToken);
    // const existingUser = await getUserById(payload._id);
    // if (!existingUser) {
    //   return res.sendStatus(403);
    // }

    merge(req, { identity: payload });

    return next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
}

export const isOwner = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const { id } = req.params;
    const currentUserId = get(req, 'identity._id') as string;

    if (!currentUserId) {
      return res.sendStatus(400);
    }

    if (currentUserId.toString() !== id) {
      return res.sendStatus(403);
    }

    next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
}