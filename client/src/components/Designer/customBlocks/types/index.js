import building from "./building";
import resource from "./resource";
import unit from "./unit";
import group from "./group";
import groupElement from "./groupElement";
import { upgrade } from "./upgrade";
import { unitUpgrade } from "./unitUpgrade";

export const types = [
  group,
  groupElement,
  building,
  resource,
  unit,
  upgrade,
  unitUpgrade,
];

export default types;
