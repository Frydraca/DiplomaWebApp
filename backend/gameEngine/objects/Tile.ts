import { Terrain } from "../enums/terrain.js";
import LocationType from "../types/locationType.js";

export default class Tile {
  location: LocationType;
  terrain: Terrain;
  buildingId: number;
  unitId: number;

  constructor(
    location: LocationType,
    terrain: Terrain,
    buildingId: number,
    unitId: number
  ) {
    this.location = location;
    this.terrain = terrain;
    this.buildingId = buildingId;
    this.unitId = unitId;
  }

  GetLocation(): LocationType {
    return this.location;
  }
  GetTerrain(): Terrain {
    return this.terrain;
  }
  GetBuildingId(): number {
    return this.buildingId;
  }
  SetBuildingId(buildingId: number): void {
    this.buildingId = buildingId;
  }
  GetUnitId(): number {
    return this.unitId;
  }
  SetUnitId(unitId: number): void {
    this.unitId = unitId;
  }

  IsEmpty(): boolean {
    if (this.buildingId === null && this.unitId === null) {
      return true;
    }
    return false;
  }

  HasUnit(): boolean {
    if (this.unitId === null) {
      return false;
    }
    return true;
  }

  HasBuilding(): boolean {
    if (this.buildingId === null) {
      return false;
    }
    return true;
  }
}
