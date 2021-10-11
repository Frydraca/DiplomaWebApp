import { TacticType } from "../../enums/tacticType.js";
import Tactic from "./tactic.js";

export default class RetreatTactic extends Tactic {
  private groupRetreatAllowed: boolean;
  private groupRetreatValue: number;
  private individualRetreatAllowed: boolean;
  private individualRetreatPercentage: number;

  constructor(
    tacticType: TacticType,
    groupRetreatAllowed: boolean,
    groupRetreatValue: number,
    individualRetreatAllowed: boolean,
    individualRetreatPercentage: number
  ) {
    super(tacticType);
    this.groupRetreatAllowed = groupRetreatAllowed;
    this.groupRetreatValue = groupRetreatValue;
    this.individualRetreatAllowed = individualRetreatAllowed;
    this.individualRetreatPercentage = individualRetreatPercentage;
  }

  public GetGroupRetreatAllowed(): boolean {
    return this.groupRetreatAllowed;
  }
  public GetGroupRetreatValue(): number {
    return this.groupRetreatValue;
  }
  public GetIndividualRetreatAllowed(): boolean {
    return this.individualRetreatAllowed;
  }
  public GetIndividualRetreatPercentage(): number {
    return this.individualRetreatPercentage;
  }
}
