const { accessTokenSecret } = require("../../../config/jwt");
const jwt = require("jsonwebtoken");
const url = require("url");

module.exports = function () {
  return function (req, res, next) {
    console.log("Authenticate JWT token");
    const authHeader = req.headers.authorization;

    if (authHeader) {
      const token = authHeader.split(" ")[1];

      jwt.verify(token, accessTokenSecret, (err, content) => {
        if (err) {
          return res.status(401).send("You have no access!");
        }

        req.email = content.email;
        var timeTillExp = (content.expirationDate - Date.now()) / 1000;
        process.stdout.write(`\tTime remaining: `);
        console.log(timeTillExp);
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
};
