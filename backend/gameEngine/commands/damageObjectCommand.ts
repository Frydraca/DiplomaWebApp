import { CommandType } from "../enums/commandType.js";
import GameEngine from "../gameEngine.js";
import GameObject from "../objects/GameObject.js";
import CommandResult from "../types/commandResult.js";
import Command from "./baseCommand.js";

export default class DamageObjectCommand extends Command {
  private object: GameObject;
  private damage: number;
  constructor(object: GameObject, damage: number) {
    super(CommandType.DamageObject);
    this.object = object;
    this.damage = damage;
  }

  public Execute(game: GameEngine): boolean {
    let result = game.DamageObject(this.object, this.damage);
    return result;
  }

  // TODO ret type
  public GetResult(): CommandResult {
    let ret = {
      type: CommandType.DamageObject,
      object: JSON.parse(JSON.stringify(this.object)),
      damage: JSON.parse(JSON.stringify(this.damage)),
    };
    return new CommandResult(ret);
  }
}
