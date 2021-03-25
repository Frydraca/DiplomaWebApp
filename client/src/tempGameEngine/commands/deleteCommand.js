import Command from "./baseCommand";

export class DeleteCommand extends Command {
  gameObject = {};
  constructor(gameObject) {
    super();
    this.gameObject = gameObject;
  }

  execute(game) {
    return game.Delete(this.gameObject);
  }
}
