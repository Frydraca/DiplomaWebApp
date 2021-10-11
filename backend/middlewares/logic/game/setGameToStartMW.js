import { CommandType } from "../../../gameEngine/enums/commandType.js";
import {
  undoAddBuilding,
  undoRemoveBuilding,
  undoAddUnit,
  undoRemoveUnit,
  undoModifyResource,
  undoUpgrade,
  undoMoveUnit,
  undoDamageObject,
} from "./helperFunctions/helperFunctions.js";

export default function () {
  return function (req, res, next) {
    if (res.locals.game.currentTurn > 0) {
      let commandsToUndo = res.locals.game.commands
        .slice(0, res.locals.game.currentTurn)
        .flat()
        .reverse();
      commandsToUndo.forEach((command) => {
        let currentCommand = command.command;
        switch (currentCommand.type) {
          case CommandType.AddBuilding:
            undoAddBuilding(
              res.locals.game.buildings,
              res.locals.game.tiles,
              currentCommand
            );
            break;
          case CommandType.RemoveBuilding:
            undoRemoveBuilding(
              res.locals.game.buildings,
              res.locals.game.tiles,
              currentCommand
            );
            break;
          case CommandType.AddUnit:
            undoAddUnit(
              res.locals.game.units,
              res.locals.game.tiles,
              currentCommand
            );
            break;
          case CommandType.RemoveUnit:
            undoRemoveUnit(
              res.locals.game.units,
              res.locals.game.tiles,
              currentCommand
            );
            break;
          case CommandType.MoveUnit:
            undoMoveUnit(
              res.locals.game.units,
              res.locals.game.tiles,
              currentCommand
            );
            break;
          case CommandType.DamageObject:
            undoDamageObject(
              res.locals.game.buildings,
              res.locals.game.units,
              currentCommand
            );
            break;
          case CommandType.ModifyResource:
            undoModifyResource(res.locals.game.players, currentCommand);
            break;
          case CommandType.UpdateResource:
            res.locals.game.players = currentCommand.oldPlayers;
            break;
          case CommandType.Upgrade:
            undoUpgrade(res.locals.game.players, currentCommand);
            break;
          default:
            console.log("Error: Unknown command! " + currentCommand.type);
            break;
        }
      });
      res.locals.game.currentCommandNumber = 0;
      res.locals.game.currentTurn = 0;
      res.locals.game.players = res.locals.game.startingPlayers;
    }
    return next();
  };
}
