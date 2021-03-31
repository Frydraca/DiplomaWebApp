import Command from "./baseCommand";

export default class AttackCommand extends Command {
  unit = {};
  attackTarget = {};
  constructor(unit, attackTarget) {
    super();
    this.unit = unit;
    this.attackTarget = attackTarget;
  }

  execute(game) {
    return game.Attack(this.unit, this.attackTarget);
  }
}
