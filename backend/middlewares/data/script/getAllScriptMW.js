const requireOption = require("../../../config/requireOption");

module.exports = function (objectrepository) {
  const Script = requireOption(objectrepository, "Script");

  return function (req, res, next) {
    console.log("Get all scripts");
    Script.find({}, (err, scripts) => {
      if (err) {
        console.log("Error: Couldn't get scripts!");
        return next(err);
      }

      res.locals.retData = { scripts: scripts };
      return next();
    });
  };
};
