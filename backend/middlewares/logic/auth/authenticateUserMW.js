import jwt from "jsonwebtoken";
import { accessTokenSecret, expTime } from "../../../config/jwt.js";

export default function () {
  return function (req, res, next) {
    const user = req.user;

    if (user === undefined || user === null) {
      return res
        .status(400)
        .send("Cannot find or create the user you were trying to.");
    }

    const accessToken = jwt.sign(
      {
        email: user.email,
        expirationDate: Date.now() + expTime * 1000,
      },
      accessTokenSecret
    );

    res.locals.retData = {
      token: accessToken,
      tokenExpirationTime: expTime,
    };

    return next();
  };
}
