import { CommandType } from "../../../gameEngine/enums/commandType.js";
import {
  doAddBuilding,
  doRemoveBuilding,
  doAddUnit,
  doRemoveUnit,
  doMoveUnit,
  doDamageObject,
  doModifyResource,
  doUpgrade,
} from "./helperFunctions/helperFunctions.js";

export default function () {
  return function (req, res, next) {
    for (let i = 0; i < req.params.turnIncrement; i++) {
      if (res.locals.game.currentTurn < res.locals.game.commands.length) {
        let commandsToDo =
          res.locals.game.commands[res.locals.game.currentTurn];
        commandsToDo.forEach((command) => {
          let currentCommand = command.command;
          switch (currentCommand.type) {
            case CommandType.AddBuilding:
              doAddBuilding(
                res.locals.game.buildings,
                res.locals.game.tiles,
                currentCommand
              );
              break;
            case CommandType.RemoveBuilding:
              doRemoveBuilding(
                res.locals.game.buildings,
                res.locals.game.tiles,
                currentCommand
              );
              break;
            case CommandType.AddUnit:
              doAddUnit(
                res.locals.game.units,
                res.locals.game.tiles,
                currentCommand
              );
              break;
            case CommandType.RemoveUnit:
              doRemoveUnit(
                res.locals.game.units,
                res.locals.game.tiles,
                currentCommand
              );
              break;
            case CommandType.MoveUnit:
              doMoveUnit(
                res.locals.game.units,
                res.locals.game.tiles,
                currentCommand
              );
              break;
            case CommandType.DamageObject:
              doDamageObject(
                res.locals.game.buildings,
                res.locals.game.units,
                currentCommand
              );
              break;
            case CommandType.ModifyResource:
              doModifyResource(res.locals.game.players, currentCommand);
              break;
            case CommandType.UpdateResource:
              res.locals.game.players = currentCommand.newPlayers;
              break;
            case CommandType.Upgrade:
              doUpgrade(res.locals.game.players, currentCommand);
              break;
            default:
              console.log("Error: Unknown command! " + currentCommand.type);
              break;
          }
          res.locals.game.currentCommandNumber++;
        });
        res.locals.game.currentTurn++;
      }
    }
    return next();
  };
}
