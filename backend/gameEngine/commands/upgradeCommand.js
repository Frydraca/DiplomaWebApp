const Command = require("./baseCommand");

module.exports = class UpgradeCommand extends Command {
  constructor(playerId, unitType, statType) {
    super("upgrade");
    this.playerId = playerId;
    this.unitType = unitType;
    this.statType = statType;
  }

  execute(game) {
    return game.UpgradeStat(this.playerId, this.unitType, this.statType);
  }

  GetPlayerId() {
    return this.playerId;
  }

  GetResult() {
    return {
      type: "upgrade",
      playerId: JSON.parse(JSON.stringify(this.playerId)),
      unitType: JSON.parse(JSON.stringify(this.unitType)),
      statType: JSON.parse(JSON.stringify(this.statType)),
    };
  }
};
