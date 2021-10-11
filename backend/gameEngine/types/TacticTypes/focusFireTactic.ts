import { TacticType } from "../../enums/tacticType.js";
import Tactic from "./tactic.js";

export default class FocusFireTactic extends Tactic {
  private focusFireEnabled: boolean;
  private focusFireTarget: string;
  private focusOnlyUnits: boolean;

  constructor(
    tacticType: TacticType,
    focusFireEnabled: boolean,
    focusFireTarget: string,
    focusOnlyUnits: boolean
  ) {
    super(tacticType);
    this.focusFireEnabled = focusFireEnabled;
    this.focusFireTarget = focusFireTarget;
    this.focusOnlyUnits = focusOnlyUnits;
  }

  public GetFocusFireEnabled(): boolean {
    return this.focusFireEnabled;
  }
  public GetFocusFireTarget(): string {
    return this.focusFireTarget;
  }
  public GetFocusOnlyUnits(): boolean {
    return this.focusOnlyUnits;
  }
}
