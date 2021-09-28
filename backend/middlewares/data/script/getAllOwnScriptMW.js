const requireOption = require("../../../config/requireOption");

module.exports = function (objectrepository) {
  const Script = requireOption(objectrepository, "Script");

  return function (req, res, next) {
    Script.find({ owner: req.user }, (err, scripts) => {
      if (err) {
        console.log("Error: Couldn't get scripts!");
        return next(err);
      }

      res.locals.retData = { ownScripts: scripts };
      return next();
    });
  };
};
