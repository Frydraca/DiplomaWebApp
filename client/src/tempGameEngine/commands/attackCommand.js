import Command from "./baseCommand";

export default class AttackCommand extends Command {
  attackerObject = {};
  targetObject = {};
  constructor(attackerObject, targetObject) {
    super();
    this.attackerObject = attackerObject;
    this.targetObject = targetObject;
  }

  execute(game) {
    return game.Attack(this.attackerObject, this.targetObject);
  }
}
