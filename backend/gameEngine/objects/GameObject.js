module.exports = class GameObject {
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
    this.owner = JSON.parse(JSON.stringify(ownerId));
    this.name = JSON.parse(JSON.stringify(objectData.name));
    this.location = JSON.parse(JSON.stringify(objectData.location));
    this.hitPoints = JSON.parse(JSON.stringify(objectData.hitPoints));
    this.armor = JSON.parse(JSON.stringify(objectData.armor));
    this.canAttack = JSON.parse(JSON.stringify(objectData.canAttack));
    this.range = JSON.parse(JSON.stringify(objectData.range));
    this.attackDamage = JSON.parse(JSON.stringify(objectData.attackDamage));
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
};
