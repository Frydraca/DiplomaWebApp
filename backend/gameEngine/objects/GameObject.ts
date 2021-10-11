import { ObjectName } from "../enums/objectName.js";
import { ObjectType } from "../enums/objectType.js";
import LocationType from "../types/locationType.js";
import ObjectData from "../types/DataTypes/objectData.js";
import Resources from "../types/resources.js";

export default class GameObject {
  private objectId: number;
  private owner: string;
  protected name: ObjectName;
  private type: ObjectType;
  private location: LocationType;
  protected cost: Resources;
  private hitPoints: number;
  private maxHitPoints: number;
  private armor: number;
  private canAttack: boolean;
  private range: number;
  private attackDamage: number;

  constructor(objectData: ObjectData, owner: string) {
    this.objectId = Date.now() + Math.random();
    this.owner = JSON.parse(JSON.stringify(owner));
    this.name = objectData.GetObjectName();
    this.type = objectData.GetType();
    this.location = objectData.GetLocation();
    this.cost = objectData.GetCost();
    this.hitPoints = objectData.GetHitPoints();
    this.maxHitPoints = objectData.GetHitPoints();
    this.armor = objectData.GetArmor();
    this.canAttack = objectData.GetCanAttack();
    this.range = objectData.GetRange();
    this.attackDamage = objectData.GetAttackDamage();
  }

  public GetObjectId(): number {
    return this.objectId;
  }
  public SetObjectId(id: number): void {
    this.objectId = id;
  }
  public GetType(): ObjectType {
    return this.type;
  }
  public GetOwner(): string {
    return this.owner;
  }
  public GetName(): ObjectName {
    return this.name;
  }
  public GetLocation(): LocationType {
    return this.location;
  }
  public SetLocation(location: LocationType): void {
    this.location = location;
  }
  public GetHitPoints(): number {
    return this.hitPoints;
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
  public TakeDamage(incomingDamage: number): number {
    let damageTaken = Math.max(incomingDamage - this.armor, 1);
    this.hitPoints -= damageTaken;
    return damageTaken;
  }
  public GetDistanceFromObject(gameObject: GameObject): number {
    return (
      Math.abs(gameObject.GetLocation().GetX() - this.location.GetX()) +
      Math.abs(gameObject.GetLocation().GetY() - this.location.GetY())
    );
  }
  public InRange(gameObject: GameObject): boolean {
    if (this.range >= this.GetDistanceFromObject(gameObject)) {
      return true;
    }
    return false;
  }
  public UpgradeArmor(value: number): void {
    this.armor += value;
  }
  public UpgradeAttackDamage(value: number): void {
    this.attackDamage += value;
  }
  public UpgradeHitPoints(value: number): void {
    this.hitPoints += value;
  }
}
