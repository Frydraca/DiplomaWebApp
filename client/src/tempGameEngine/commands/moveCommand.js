import Command from "./baseCommand";

export default class MoveCommand extends Command {
  unit = {};
  tile = {};
  constructor(unit, tile) {
    super();
    this.unit = unit;
    this.tile = tile;
  }

  execute(game) {
    return game.Move(this.unit, this.tile);
  }
}
