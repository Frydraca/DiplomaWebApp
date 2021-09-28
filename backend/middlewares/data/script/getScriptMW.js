const requireOption = require("../../../config/requireOption");

module.exports = function (objectrepository) {
  const Script = requireOption(objectrepository, "Script");

  return function (req, res, next) {
    if (req.params.scriptId === "new") {
      res.locals.retData = {
        script: {
          _id: "new",
          name: "new",
          owner: req.user,
          creationDate: Date.now(),
          lastModified: Date.now(),
          content: "",
          workspace: '<xml xmlns="https://developers.google.com/blockly/xml"/>',
        },
      };
      return next();
    }
    Script.findOne({ _id: req.params.scriptId }, (err, script) => {
      if (err || !script) {
        console.log("Error: coudn't find script!");
        return next(err);
      }
      res.locals.retData = { script: script };
      res.locals.script = script;
      return next();
    });
  };
};
