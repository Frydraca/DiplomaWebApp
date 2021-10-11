import { BuildingStatus } from "../enums/buildingStatus.js";
import { Terrain } from "../enums/terrain.js";
import BuildingData from "../types/DataTypes/buildingData.js";
import Resources from "../types/resources.js";
import GameObject from "./GameObject.js";

export default class Building extends GameObject {
  possibleTerrain: Terrain[];
  usage: Resources;
  production: Resources;
  // Foundation, Complete
  status: BuildingStatus;
  buildingProgress: number;
  buildTime: number;
  constructor(buildingData: BuildingData, owner: string) {
    super(buildingData, owner);
    this.status = BuildingStatus.Foundation;
    this.buildingProgress = 0;
    this.buildTime = buildingData.GetBuildTime();
    this.possibleTerrain = buildingData.GetPossibleTerrain();
    this.usage = buildingData.GetUsage();
    this.production = buildingData.GetProduction();
  }

  public IsLocationValid(terrain: Terrain): boolean {
    return this.possibleTerrain.includes(terrain);
  }

  public GetBuildingStatus(): BuildingStatus {
    return this.status;
  }

  public IncreaseBuildProgress(value: number): void {
    this.buildingProgress += value;
  }

  public Complete(): void {
    this.status = BuildingStatus.Complete;
  }

  public IsComplete(): boolean {
    if (this.buildingProgress >= this.buildTime) return true;
    return false;
  }

  public IsBuildingComplete(): boolean {
    if (this.status === BuildingStatus.Foundation) return false;
    else return true;
  }

  public CanBuild(resources: Resources): boolean {
    if (resources.HasMoreOrEqualThan(this.cost)) {
      return true;
    }
    return false;
  }

  public TakeCost(resources: Resources): Resources {
    resources.Decrease(this.cost);
    return resources;
  }
  public UpdateResources(resources: Resources): Resources {
    if (resources.HasMoreOrEqualThan(this.usage)) {
      resources.Decrease(this.usage);
      resources.Increase(this.production);
    }
    return resources;
  }
}
