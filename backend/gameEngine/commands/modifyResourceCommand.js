const Command = require("./baseCommand");

module.exports = class ModifyResourceCommand extends Command {
  constructor(playerId, resource, value) {
    super("modify resource");
    this.playerId = playerId;
    this.resource = resource;
    this.value = value;
  }

  execute(game) {
    return game.ModifyResource(this.playerId, this.resource, this.value);
  }

  GetPlayerId() {
    return this.playerId;
  }

  GetResource() {
    return this.resource;
  }

  GetValue() {
    return this.value;
  }

  GetResult() {
    return {
      type: "modify resource",
      playerId: JSON.parse(JSON.stringify(this.playerId)),
      resource: JSON.parse(JSON.stringify(this.resource)),
      value: JSON.parse(JSON.stringify(this.value)),
    };
  }
};
