import Command from "./baseCommand";

export default class AttackCommand extends Command {
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
}
