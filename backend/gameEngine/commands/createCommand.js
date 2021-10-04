const Command = require("./baseCommand");

module.exports = class CreateCommand extends Command {
  unit = {};
  location = [];
  constructor(unit) {
    super("create");
    this.unit = unit;
  }

  execute(game) {
    let result = game.Create(this.unit);
    this.location = result.location;
    return result.success;
  }

  GetUnit() {
    return this.unit;
  }

  GetResult() {
    return {
      type: "create",
      unit: JSON.parse(JSON.stringify(this.unit)),
      location: JSON.parse(JSON.stringify(this.location)),
    };
  }
};
