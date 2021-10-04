const Command = require("./baseCommand");

module.exports = class BuildCommand extends Command {
  building = {};
  location = [];
  constructor(building) {
    super("build");
    this.building = building;
  }

  execute(game) {
    let result = game.Build(this.building);
    this.location = result.location;
    return result.success;
  }

  GetBuilding() {
    return this.building;
  }

  GetResult() {
    return {
      type: "build",
      building: JSON.parse(JSON.stringify(this.building)),
      location: JSON.parse(JSON.stringify(this.location)),
    };
  }
};
