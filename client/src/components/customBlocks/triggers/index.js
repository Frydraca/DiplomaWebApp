import enemyAttackedBuilding from "./enemyAttackedBuilding";
import enemyAttacked from "./enemyAttacked";
import hasLessThan from "./hasLessThan";
import haveSomething from "./haveSomething";

export const triggers = [
  haveSomething,
  hasLessThan,
  enemyAttacked,
  enemyAttackedBuilding,
];

export default triggers;
