import { ObjectName } from "../../enums/objectName.js";
import { ObjectType } from "../../enums/objectType.js";
import LocationType from "../locationType.js";
import Resources from "../resources.js";

export default class ObjectData {
  private objectName: ObjectName;
  private type: ObjectType;
  private location: LocationType;
  private cost: Resources;
  private hitPoints: number;
  private armor: number;
  private canAttack: boolean;
  private range: number;
  private attackDamage: number;

  constructor(jsonData: any) {
    this.objectName = jsonData.objectName;
    this.type = jsonData.type;
    this.location = new LocationType(
      jsonData.location[0],
      jsonData.location[1]
    );
    this.cost = new Resources(
      jsonData.cost.energy,
      jsonData.cost.steel,
      jsonData.cost.roboSteel,
      jsonData.cost.crystal,
      jsonData.cost.energyCore,
      jsonData.cost.credits
    );
    this.hitPoints = jsonData.hitPoints;
    this.armor = jsonData.armor;
    this.canAttack = jsonData.canAttack;
    this.range = jsonData.range;
    this.attackDamage = jsonData.attackDamage;
  }

  public GetObjectName(): ObjectName {
    return this.objectName;
  }
  public GetType(): ObjectType {
    return this.type;
  }
  public GetLocation(): LocationType {
    return this.location;
  }
  public GetCost(): Resources {
    return this.cost;
  }
  public GetHitPoints(): number {
    return this.hitPoints;
  }
  public GetArmor(): number {
    return this.armor;
  }
  public GetCanAttack(): boolean {
    return this.canAttack;
  }
  public GetRange(): number {
    return this.range;
  }
  public GetAttackDamage(): number {
    return this.attackDamage;
  }
}
