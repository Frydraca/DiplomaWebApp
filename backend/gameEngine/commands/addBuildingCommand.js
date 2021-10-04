const Command = require("./baseCommand");

module.exports = class AddBuildingCommand extends Command {
  building = {};
  location = [];
  constructor(building, location) {
    super("add building");
    this.building = building;
    this.location = location;
  }

  execute(game) {
    let result = game.AddBuilding(this.building, this.location);
    return result;
  }

  GetBuilding() {
    return this.building;
  }

  GetResult() {
    return {
      type: "add building",
      building: JSON.parse(JSON.stringify(this.building)),
      location: JSON.parse(JSON.stringify(this.location)),
    };
  }
};
