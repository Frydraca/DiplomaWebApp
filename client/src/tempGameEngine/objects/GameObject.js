export default class GameObject {
  objectId = "";
  stats = {};
  constructor(objectData) {
    this.objectId = Date.now() + Math.random();
    this.stats = objectData;
  }

  GetObjectId() {
    return this.objectId;
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
