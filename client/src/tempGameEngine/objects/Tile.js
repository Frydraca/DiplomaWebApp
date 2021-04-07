export default class Tile {
  location = [0, 0];
  terrain = "";
  buildingId = "";
  unitId = "";

  constructor(tileData, buildingId, unitId) {
    this.location = JSON.parse(JSON.stringify(tileData.location));
    this.terrain = JSON.parse(JSON.stringify(tileData.terrain));
    this.buildingId = JSON.parse(JSON.stringify(buildingId));
    this.unitId = JSON.parse(JSON.stringify(unitId));
  }

  GetLocation() {
    return this.location;
  }

  GetTerrain() {
    return this.terrain;
  }

  GetBuildingId() {
    return this.buildingId;
  }

  SetBuildingId(buildingId) {
    this.buildingId = buildingId;
  }

  GetUnitId() {
    return this.unitId;
  }

  SetUnitId(unitId) {
    this.unitId = unitId;
  }

  IsEmpty() {
    if (this.buildingId === "null" && this.unitId === "null") {
      return true;
    }
    return false;
  }

  HasUnit() {
    if (this.unitId === "null") {
      return false;
    }
    return true;
  }

  HasBuilding() {
    if (this.buildingId === "null") {
      return false;
    }
    return true;
  }
}
