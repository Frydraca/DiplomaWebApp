import { accessTokenSecret } from "../../../config/jwt.js";
import jwt from "jsonwebtoken";
import url from "url";

export default function () {
  return function (req, res, next) {
    const authHeader = req.headers.authorization;

    if (authHeader) {
      const token = authHeader.split(" ")[1];

      jwt.verify(token, accessTokenSecret, (err, content) => {
        if (err) {
          return res.status(401).send("You have no access!");
        }

        req.email = content.email;
        var timeTillExp = (content.expirationDate - Date.now()) / 1000;
        if (timeTillExp < 0) {
          return res.status(401).redirect(
            url.format({
              pathname: "/force-logout",
              query: { email: req.email },
            })
          );
        }
        return next();
      });
    } else {
      return res.status(401).send("You have no access!");
    }
  };
}
