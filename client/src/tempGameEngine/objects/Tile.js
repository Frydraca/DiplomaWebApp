export default class Tile {
  location = [0, 0];
  terrain = "";
  buildingId = "";
  unitId = "";

  constructor(tileData, buildingId, unitId) {
    this.location = tileData.location;
    this.terrain = tileData.terrain;
    this.buildingId = buildingId;
    this.unitId = unitId;
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
}
