const Command = require("./baseCommand");

module.exports = class MoveCommand extends Command {
  unitToMove = {};
  tile = {};
  startLocation = [];
  endLocation = [];
  constructor(unitToMove, tile) {
    super("move");
    this.unitToMove = unitToMove;
    this.tile = tile;
  }

  execute(game, gameState) {
    let result = game.Move(gameState, this.unitToMove, this.tile);
    this.startLocation = result.start;
    this.endLocation = result.end;
    return result.success;
  }

  GetUnitToMove() {
    return this.unitToMove;
  }

  GetTile() {
    return this.tile;
  }

  GetResult() {
    return {
      type: "move",
      startLocation: JSON.parse(JSON.stringify(this.startLocation)),
      endLocation: JSON.parse(JSON.stringify(this.endLocation)),
    };
  }
};
