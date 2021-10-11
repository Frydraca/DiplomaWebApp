import { CommandType } from "../enums/commandType.js";
import GameEngine from "../gameEngine.js";
import Unit from "../objects/Unit.js";
import CommandResult from "../types/commandResult.js";
import LocationType from "../types/locationType.js";
import Command from "./baseCommand.js";

export default class RemoveUnitCommand extends Command {
  private unit: Unit;
  private location: LocationType;

  constructor(unit: Unit, location: LocationType) {
    super(CommandType.RemoveUnit);
    this.unit = unit;
    this.location = location;
  }

  public Execute(game: GameEngine): boolean {
    let result = game.RemoveUnit(this.unit);
    return result;
  }

  // TODO ret type
  public GetResult(): CommandResult {
    let ret = {
      type: CommandType.RemoveUnit,
      unit: JSON.parse(JSON.stringify(this.unit)),
      location: JSON.parse(JSON.stringify(this.location)),
    };
    return new CommandResult(ret);
  }
}
