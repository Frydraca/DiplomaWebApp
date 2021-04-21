const requireOption = require("../../../config/requireOption");

module.exports = function (objectrepository) {
  const Script = requireOption(objectrepository, "Script");

  return function (req, res, next) {
    console.log("Create Script");

    var script = new Script({
      name: req.body.name,
      owner: req.user,
      creationDate: Date.now(),
      content: req.body.content,
      workspace: req.body.workspace,
    });

    script.save(function (err, successfulScript) {
      if (err) {
        return res.status(400).send("Cannot create script!");
      }

      res.locals.retData = {
        id: successfulScript.id,
        owner: {
          id: req.user.id,
          email: req.user.email,
          userName: req.user.userName,
        },
      };
      return next();
    });
  };
};
