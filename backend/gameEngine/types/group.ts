import { ObjectType } from "../enums/objectType.js";
import GroupElement from "./groupElement.js";

export default class Group {
  private groupType: ObjectType;
  private groupElements: GroupElement[];

  constructor(objectType: ObjectType, groupElements: GroupElement[]) {
    this.groupType = objectType;
    this.groupElements = groupElements;
  }

  public GetGroupType(): ObjectType {
    return this.groupType;
  }
  public GetGroupElements(): GroupElement[] {
    return this.groupElements;
  }
}
