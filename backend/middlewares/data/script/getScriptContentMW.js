const requireOption = require("../../../config/requireOption");

module.exports = function (objectrepository) {
  const Script = requireOption(objectrepository, "Script");

  return function (req, res, next) {
    console.log("Get script contetn");

    Script.findOne({ _id: req.params.ownScriptId }, (err, script) => {
      if (err || !script) {
        console.log("Error: coudn't find script!");
        return next(err);
      }
      res.locals.ownScriptContent = script.content;
      res.locals.ownScriptWorkspace = script.workspace;
    });

    Script.findOne({ _id: req.params.enemyScriptId }, (err, script) => {
      if (err || !script) {
        console.log("Error: coudn't find script!");
        return next(err);
      }
      res.locals.enemyScriptContent = script.content;
      res.locals.enemyScriptWorkspace = script.workspace;
      return next();
    });
  };
};
