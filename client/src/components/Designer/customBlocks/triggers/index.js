import orBlock from "./or";
import enemyAttackedBuilding from "./enemyAttackedBuilding";
import enemyAttacked from "./enemyAttacked";
import enemyUnit from "./enemyUnit";
import enemyUnitPercentage from "./enemyUnitPercentage";
import haveComparator from "./haveComparator";
import haveSomething from "./haveSomething";

export const triggers = [
  orBlock,
  haveSomething,
  haveComparator,
  enemyAttacked,
  enemyUnit,
  enemyUnitPercentage,
];

export default triggers;
