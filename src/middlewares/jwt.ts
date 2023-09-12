// extract token from request
import * as jose from "jose";
import config from "../config";
// fs.writeFile(__dirname + '/../sibling_dir/file.txt', 'test');
export const userAuth = async (authtoken: string) => {
  let token = "";
  if (authtoken !== undefined) {
    token = authtoken.replace("Bearer ", "");
  }

  const ecPublicKey = await jose.importSPKI(
    config.PUBLIC_KEY as string,
    config.ALGORITHM
  );
  try {
    // verify token
    const { payload, protectedHeader } = await jose.jwtVerify(
      token,
      ecPublicKey,
      {
        issuer: "urn:example:issuer",
        audience: "urn:example:audience",
      }
    );

    return payload.data;
  } catch (e) {
    // token verification failed
    console.log("Token is invalid");

    return false;
  }
};

export const generateJwtToken = async (payload: jose.JWTPayload) => {
  const secret = await jose.importPKCS8(config.PRIVATEKEY as string, config.ALGORITHM);

  const jwt = await new jose.SignJWT({ data: payload })
    .setProtectedHeader({ alg: config.ALGORITHM })
    .setIssuedAt()
    .setIssuer("urn:example:issuer")
    .setAudience("urn:example:audience")
    .setExpirationTime("2h")
    .sign(secret);

  let user = {
    ...payload,
    token: jwt,
    exp: '2h'
  }
  return user;
};
