const {
  doBuild,
  doCreate,
  doMove,
  doAttack,
  doModifyResource,
  doUpgrade,
} = require("./helperFunctions/helperFunctions");

module.exports = function () {
  return function (req, res, next) {
    console.log("set game to the end");
    if (res.locals.game.currentTurn <= res.locals.game.commands.length) {
      let commandsToDo = res.locals.game.commands
        .slice(res.locals.game.currentTurn)
        .flat();
      console.log(commandsToDo);
      commandsToDo.forEach((command) => {
        switch (command.type) {
          case "build":
            doBuild(res.locals.game.buildings, res.locals.game.tiles, command);
            break;
          case "create":
            doCreate(res.locals.game.units, res.locals.game.tiles, command);
            break;
          case "move":
            doMove(res.locals.game.units, res.locals.game.tiles, command);
            break;
          case "attack":
            doAttack(res.locals.game.buildings, res.locals.game.units, command);
            break;
          case "modify resource":
            doModifyResource(res.locals.game.players, command);
            break;
          case "upgrade":
            doUpgrade(res.locals.game.players, command);
            break;
          case "updateResources":
            res.locals.game.players = command.oldPlayers;
            break;
          default:
            console.log("Error: Unknown command!");
            break;
        }
      });
      res.locals.game.currentCommandNumber =
        res.locals.game.commands.flat().length;
      res.locals.game.currentTurn = res.locals.game.commands.length;
    }
    return next();
  };
};
