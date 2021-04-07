import Command from "./baseCommand";

export default class BuildCommand extends Command {
  building = {};
  constructor(building) {
    super("build");
    this.building = building;
  }

  execute(game, gameState) {
    return game.Build(gameState, this.building);
  }

  GetBuilding() {
    return this.building;
  }
}
