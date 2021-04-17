/**
 * Load a nagymama from the database using the :nagymamaid param
 * The result is saved to res.locals.nagymama
 */
const requireOption = require("../requireOption");

module.exports = function (objectrepository) {
  const GameMap = requireOption(objectrepository, "GameMap");

  return function (req, res, next) {
    // GameMap.findOne({ _id: req.params.gameId }, (err, nagymama) => {
    //   if (err || !nagymama) {
    //     return next(err);
    //   }

    //   res.locals.nagymama = nagymama;
    //   return next();
    // });

    return next();
  };
};
