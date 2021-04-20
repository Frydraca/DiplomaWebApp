const Command = require("./baseCommand");

module.exports = class AttackCommand extends Command {
  attackerObject = {};
  targetObject = {};
  constructor(attackerObject, targetObject) {
    super("attack");
    this.attackerObject = attackerObject;
    this.targetObject = targetObject;
  }

  execute(game, gameState) {
    return game.Attack(gameState, this.attackerObject, this.targetObject);
  }

  GetAttackerObject() {
    return this.attackerObject;
  }

  GetTargetObject() {
    return this.targetObject;
  }

  GetResult() {
    return {
      type: "attack",
      attackerObject: JSON.parse(JSON.stringify(this.attackerObject)),
      targetObject: JSON.parse(JSON.stringify(this.targetObject)),
    };
  }
};
