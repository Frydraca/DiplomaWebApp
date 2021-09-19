import orBlock from "./or";
import enemyAttackedBuilding from "./enemyAttackedBuilding";
import enemyAttacked from "./enemyAttacked";
import enemyUnit from "./enemyUnit";
import enemyUnitPercentage from "./enemyUnitPercentage";
import hasLessThan from "./hasLessThan";
import haveSomething from "./haveSomething";

export const triggers = [
  orBlock,
  haveSomething,
  hasLessThan,
  enemyAttacked,
  enemyAttackedBuilding,
  enemyUnit,
  enemyUnitPercentage,
];

export default triggers;
