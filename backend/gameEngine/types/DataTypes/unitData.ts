import ObjectData from "./objectData.js";

export default class UnitData extends ObjectData {
  private speed: number;

  constructor(jsonData: any) {
    super(jsonData);
    this.speed = JSON.parse(JSON.stringify(jsonData.speed)); // TODO
  }

  public GetSpeed(): number {
    return this.speed;
  }
}
