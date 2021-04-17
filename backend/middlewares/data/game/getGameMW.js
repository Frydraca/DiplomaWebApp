const requireOption = require("../../../config/requireOption");

module.exports = function (objectrepository) {
  const Game = requireOption(objectrepository, "Game");

  return function (req, res, next) {
    console.log("Get game simulation");

    // Game.findById({ _id: req.params.gameId }).exec(function (err) {
    //   if (err) {
    //     return res.status(400).send("Cannot find game!");
    //   }

    //   console.log(doc);
    //   res.locals.retData = {
    //     commands: doc.commands,
    //   };
    //   return next();
    // });
    return next();
  };
};
