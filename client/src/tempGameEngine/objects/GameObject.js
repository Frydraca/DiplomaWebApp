export default class GameObject {
  stats = {};
  constructor(objectData) {
    this.stats = objectData;
  }

  GetOwner() {
    return this.stats.owner;
  }
  GetName() {
    return this.stats.name;
  }
  GetLocation() {
    return this.stats.location;
  }
}
