import Command from "./baseCommand";

export class MoveCommand extends Command {
  unit = {};
  location = [0, 0];
  constructor(unit, location) {
    super();
    this.unit = unit;
    this.location = location;
  }

  execute(game) {
    return game.Move(this.unit, this.location);
  }
}
