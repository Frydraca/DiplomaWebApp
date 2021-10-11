import { CommandType } from "../enums/commandType.js";
import GameEngine from "../gameEngine.js";
import Building from "../objects/Building.js";
import CommandResult from "../types/commandResult.js";
import LocationType from "../types/locationType.js";
import Command from "./baseCommand.js";

export default class AddBuildingCommand extends Command {
  private building: Building;
  private location: LocationType;
  constructor(building: Building, location: LocationType) {
    super(CommandType.AddBuilding);
    this.building = building;
    this.location = location;
  }

  public Execute(game: GameEngine): boolean {
    let result = game.AddBuilding(this.building, this.location);
    return result;
  }

  public GetBuilding(): Building {
    return this.building;
  }

  // TODO ret type
  public GetResult(): CommandResult {
    let ret = {
      type: CommandType.AddBuilding,
      building: JSON.parse(JSON.stringify(this.building)),
      location: JSON.parse(JSON.stringify(this.location)),
    };
    return new CommandResult(ret);
  }
}
