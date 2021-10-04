const Command = require("./baseCommand");

module.exports = class RemoveBuildingCommand extends Command {
  building = {};
  location = [];
  constructor(building, location) {
    super("add building");
    this.building = building;
    this.location = location;
  }

  execute(game) {
    let result = game.RemoveBuilding(this.building);
    return result;
  }

  GetBuilding() {
    return this.building;
  }

  GetResult() {
    return {
      type: "remove building",
      building: JSON.parse(JSON.stringify(this.building)),
      location: JSON.parse(JSON.stringify(this.location)),
    };
  }
};
