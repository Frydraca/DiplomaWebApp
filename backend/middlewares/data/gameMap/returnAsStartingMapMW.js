module.exports = function () {
  return function (req, res, next) {
    console.log("return one game map as starting map");
    console.log(res.locals.gameMap);
    res.locals.retData = {
      id: res.locals.gameMap._id,
      currentGameState: {
        turnNumber: 0,
        players: [],
        tiles: res.locals.gameMap.tiles,
        buildings: [],
        units: [],
      },
    };
    return next();
  };
};
