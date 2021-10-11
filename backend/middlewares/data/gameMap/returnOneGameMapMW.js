export default function () {
  return function (req, res, next) {
    console.log("return one game map");
    res.locals.retData = { currentGameMap: res.locals.gameMap };
    return next();
  };
}
