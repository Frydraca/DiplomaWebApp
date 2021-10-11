import { TacticType } from "../../enums/tacticType.js";

export default class Tactic {
  private tacticType: TacticType;

  constructor(tacticType: TacticType) {
    this.tacticType = tacticType;
  }

  public GetTacticType(): TacticType {
    return this.tacticType;
  }
}
