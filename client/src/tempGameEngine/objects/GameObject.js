export default class GameObject {
  objectId = "";
  owner = "";
  name = "";
  location = [0, 0];
  constructor(objectData) {
    this.objectId = Date.now() + Math.random();
    this.owner = objectData.owner;
    this.name = objectData.name;
    this.location = objectData.location;
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
}
