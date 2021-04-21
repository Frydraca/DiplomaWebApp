const Command = require("./baseCommand");

module.exports = class DeleteCommand extends Command {
  objectToDelete = {};
  constructor(objectToDelete) {
    super("delete");
    this.objectToDelete = objectToDelete;
  }

  execute(gameState, game) {
    return game.Delete(gameState, this.objectToDelete);
  }

  GetObjectToDelete() {
    return this.objectToDelete;
  }
};