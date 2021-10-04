const Command = require("./baseCommand");

module.exports = class DeleteCommand extends Command {
  objectToDelete = {};
  constructor(objectToDelete) {
    super("delete");
    this.objectToDelete = objectToDelete;
  }

  execute(game) {
    return game.Delete(this.objectToDelete);
  }

  GetObjectToDelete() {
    return this.objectToDelete;
  }
};
