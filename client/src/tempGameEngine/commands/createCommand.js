import Command from "./baseCommand";

export default class CreateCommand extends Command {
  unit = {};
  constructor(unit) {
    super();
    this.unit = unit;
  }

  execute(game) {
    return game.Create(this.unit);
  }
}
