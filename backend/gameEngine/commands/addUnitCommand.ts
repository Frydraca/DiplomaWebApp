import { CommandType } from "../enums/commandType.js";
import GameEngine from "../gameEngine.js";
import Unit from "../objects/Unit.js";
import CommandResult from "../types/commandResult.js";
import LocationType from "../types/locationType.js";
import Command from "./baseCommand.js";

export default class AddUnitCommand extends Command {
  private unit: Unit;
  private location: LocationType;
  constructor(unit: Unit, location: LocationType) {
    super(CommandType.AddUnit);
    this.unit = unit;
    this.location = location;
  }

  public Execute(game: GameEngine): boolean {
    let result = game.AddUnit(this.unit, this.location);
    return result;
  }

  public GetUnit(): Unit {
    return this.unit;
  }

  // TODO ret type
  public GetResult(): CommandResult {
    let ret = {
      type: CommandType.AddUnit,
      unit: JSON.parse(JSON.stringify(this.unit)),
      location: JSON.parse(JSON.stringify(this.location)),
    };
    return new CommandResult(ret);
  }
}
