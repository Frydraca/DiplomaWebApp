const Command = require("./baseCommand");

module.exports = class MoveCommand extends Command {
  unitToMove = {};
  tile = {};
  constructor(unitToMove, tile) {
    super("move");
    this.unitToMove = unitToMove;
    this.tile = tile;
  }

  execute(game, gameState) {
    return game.Move(gameState, this.unitToMove, this.tile);
  }

  GetUnitToMove() {
    return this.unitToMove;
  }

  GetTile() {
    return this.tile;
  }
};
