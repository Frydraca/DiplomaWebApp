import { FocusTarget } from "../../enums/FocusTarget.js";
import { TacticType } from "../../enums/tacticType.js";
import Tactic from "./tactic.js";

export default class FocusFireTactic extends Tactic {
  private focusFireEnabled: boolean;
  private focusFireTarget: FocusTarget;
  private focusOnlyUnits: boolean;

  constructor(
    tacticType: TacticType,
    focusFireEnabled: boolean,
    focusFireTarget: string,
    focusOnlyUnits: boolean
  ) {
    super(tacticType);
    this.focusFireEnabled = focusFireEnabled;

    switch (focusFireTarget) {
      case "closest":
        this.focusFireTarget = FocusTarget.Closest;
        break;
      case "lowest":
        this.focusFireTarget = FocusTarget.LowestHP;
        break;
      case "strongest":
        this.focusFireTarget = FocusTarget.HighestDamage;
        break;
      default:
        this.focusFireTarget = FocusTarget.Closest;
        break;
    }
    this.focusOnlyUnits = focusOnlyUnits;
  }

  public GetFocusFireEnabled(): boolean {
    return this.focusFireEnabled;
  }
  public GetFocusFireTarget(): FocusTarget {
    return this.focusFireTarget;
  }
  public GetFocusOnlyUnits(): boolean {
    return this.focusOnlyUnits;
  }
}
