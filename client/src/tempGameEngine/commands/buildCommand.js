import Command from "./baseCommand";

export class BuildCommand extends Command {
  building = {};
  constructor(building) {
    super();
    this.building = building;
  }

  execute(game) {
    return game.Build(this.building);
  }
}
