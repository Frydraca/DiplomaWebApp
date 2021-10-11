import { CommandType } from "../enums/commandType.js";
import GameEngine from "../gameEngine.js";
import Unit from "../objects/Unit.js";
import CommandResult from "../types/commandResult.js";
import LocationType from "../types/locationType.js";
import Command from "./baseCommand.js";

export default class MoveUnitCommand extends Command {
  private unitToMove: Unit;
  private startLocation: LocationType;
  private endLocation: LocationType;

  constructor(
    unitToMove: Unit,
    startLocation: LocationType,
    endLocation: LocationType
  ) {
    super(CommandType.MoveUnit);
    this.unitToMove = unitToMove;
    this.startLocation = startLocation;
    this.endLocation = endLocation;
  }

  public Execute(game: GameEngine): boolean {
    let result = game.MoveUnit(this.unitToMove, this.endLocation);
    return result;
  }

  // TODO ret type
  public GetResult(): CommandResult {
    let ret = {
      type: CommandType.MoveUnit,
      unit: JSON.parse(JSON.stringify(this.unitToMove)),
      startLocation: JSON.parse(JSON.stringify(this.startLocation)),
      endLocation: JSON.parse(JSON.stringify(this.endLocation)),
    };
    return new CommandResult(ret);
  }
}
