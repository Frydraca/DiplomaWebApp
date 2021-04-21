const requireOption = require("../../../config/requireOption");

module.exports = function (objectrepository) {
  const Script = requireOption(objectrepository, "Script");

  return function (req, res, next) {
    console.log("Get script");
    Script.findOne({ _id: req.params.scriptId }, (err, script) => {
      if (err || !script) {
        console.log("Error: coudn't find script!");
        return next(err);
      }
      res.locals.retData = { script: script };
      return next();
    });
  };
};
