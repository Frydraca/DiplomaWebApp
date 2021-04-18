const Command = require("./baseCommand");

module.exports = class CreateCommand extends Command {
  unit = {};
  constructor(unit) {
    super("create");
    this.unit = unit;
  }

  execute(game, gameState) {
    return game.Create(gameState, this.unit);
  }

  GetUnit() {
    return this.unit;
  }
};
