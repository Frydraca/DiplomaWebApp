import { CommandType } from "../enums/commandType.js";
import GameEngine from "../gameEngine.js";
import CommandResult from "../types/commandResult.js";

export default abstract class Command {
  private type: CommandType;

  constructor(type: CommandType) {
    this.type = type;
  }

  public abstract Execute(game: GameEngine): boolean;

  public GetType(): CommandType {
    return this.type;
  }

  public abstract GetResult(): CommandResult;
}
