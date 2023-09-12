import express from "express";

import { getUserByEmail, createUser } from "../db/users";
import { authentication, random } from "../helpers";
import { generateJwtToken } from "../middlewares/jwt";
import axios from "axios";

const welaLoginRequest = async (
  url: string,
  values: { username: string; password: string }
) => {
  try {
    // let loginUrl = `https://${url}.wela.ph/api/method/login`;

    // const resp = await axios.post(loginUrl, {
    //   usr: values.email,
    //   pwd: values.password,
    // });
    // const resp = await axios(`http://0.0.0.0:8000/api/method/wela_web_connector.api.authentication.login`, {
    //   method: 'post',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   data: values
    // })
    const resp = await axios(`https://${url}.wela.ph/api/method/wela_web_connector.api.authentication.login`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      data: values
    })
    if (resp.data.message.success_key === 0) {
      resp.status = 401
    } else {
      resp.data = resp.data.message
    }

    return resp;
  } catch (error) {
    console.log("welaLoginRequest error", error.response);
    return error.response;
  }

  // console.log(resp)
};

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { username, password } = req.body;
    const { school } = req.params;

    const welaResp = await welaLoginRequest(school, { username, password });

    if (!username || !password) {
      return res.sendStatus(400);
    } else if (!welaResp) {
      return res.sendStatus(400);
    } else if (welaResp.status === 500) {
      return res.sendStatus(500);
    } else if (welaResp.status === 401) {
      return res.sendStatus(401);
    } else if (welaResp.status === 200) {
      let userIdentity: any = {
        ...welaResp.data
      };
      const tokenDetails = await generateJwtToken(userIdentity);

      const data = {
        message: tokenDetails.message,
        data: {
          username: tokenDetails.username,
          email: tokenDetails.email,
          role: tokenDetails.role,
        },

        token: tokenDetails.token,
        exp: tokenDetails.exp
      }
      return res.status(200).json(data).end();
    } else {
      return res.sendStatus(400);
    }

    // const user = await getUserByEmail(email).select(
    //   "+authentication.salt +authentication.password"
    // );

    // if (!user) {
    //   return res.sendStatus(400);
    // }

    // const expectedHash = authentication(user.authentication.salt, password);

    // if (user.authentication.password != expectedHash) {
    //   return res.sendStatus(403);
    // }
    // const salt = random();
    // user.authentication.sessionToken = authentication(salt, user._id.toString());

    // await user.save();

    // res.cookie('ANTONIO-AUTH', user.authentication.sessionToken, { domain: 'localhost', path: '/' });
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      return res.sendStatus(400);
    }

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return res.sendStatus(400);
    }

    const salt = random();
    const user = await createUser({
      email,
      username,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    });

    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
