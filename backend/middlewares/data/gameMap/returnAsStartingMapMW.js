export default function () {
  return function (req, res, next) {
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
}
