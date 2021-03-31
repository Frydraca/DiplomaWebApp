export default class GameObject {
  objectId = "";
  owner = "";
  name = "";
  location = [0, 0];
  hitPoints = 0;
  armor = 0;
  canAttack = false;
  range = 0;
  attackDamage = 0;
  constructor(objectData, ownerId) {
    this.objectId = Date.now() + Math.random();
    this.owner = ownerId;
    this.name = objectData.name;
    this.location = objectData.location;
    this.hitPoints = objectData.hitPoints;
    this.armor = objectData.armor;
    this.canAttack = objectData.canAttack;
    this.range = objectData.range;
    this.attackDamage = objectData.attackDamage;
  }

  GetObjectId() {
    return this.objectId;
  }

  GetOwner() {
    return this.owner;
  }
  GetName() {
    return this.name;
  }
  GetLocation() {
    return this.location;
  }
  SetLocation(location) {
    this.location = location;
  }
  GetHitPoints() {
    return this.hitPoints;
  }
  GetCanAttack() {
    return this.canAttack;
  }
  GetRange() {
    return this.range;
  }
  GetAttackDamage() {
    return this.attackDamage;
  }
  TakeDamage(incomingDamage) {
    this.hitPoints -= Math.max(incomingDamage - this.armor, 1);
  }
}
