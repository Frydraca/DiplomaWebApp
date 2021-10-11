import { CommandType } from "../enums/commandType.js";
import { ResourceType } from "../enums/resourceType.js";
import GameEngine from "../gameEngine.js";
import CommandResult from "../types/commandResult.js";
import Command from "./baseCommand.js";

export default class ModifyResourceCommand extends Command {
  private playerName: string;
  private resource: ResourceType;
  private value: number;

  constructor(playerName: string, resource: ResourceType, value: number) {
    super(CommandType.ModifyResource);
    this.playerName = playerName;
    this.resource = resource;
    this.value = value;
  }

  public Execute(game: GameEngine): boolean {
    return game.ModifyResource(this.playerName, this.resource, this.value);
  }

  public GetPlayerName(): string {
    return this.playerName;
  }

  public GetResource(): ResourceType {
    return this.resource;
  }

  public GetValue(): number {
    return this.value;
  }

  //TODO ret type
  public GetResult(): CommandResult {
    let ret = {
      type: CommandType.ModifyResource,
      playerId: JSON.parse(JSON.stringify(this.playerName)),
      resource: JSON.parse(JSON.stringify(this.resource)),
      value: JSON.parse(JSON.stringify(this.value)),
    };
    return new CommandResult(ret);
  }
}
