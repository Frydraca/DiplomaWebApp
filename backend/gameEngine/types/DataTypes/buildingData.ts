import { Terrain } from "../../enums/terrain.js";
import ObjectData from "./objectData.js";
import Resources from "../resources.js";

export default class BuildingData extends ObjectData {
  private possibleTerrain: Terrain[];
  private buildTime: number;
  private usage: Resources;
  private production: Resources;

  constructor(jsonData) {
    super(jsonData);
    this.possibleTerrain = [];
    jsonData.possibleTerrain.forEach((element) => {
      this.possibleTerrain.push(element);
    });
    this.buildTime = JSON.parse(JSON.stringify(jsonData.buildTime));
    this.usage = new Resources(
      jsonData.usage.energy,
      jsonData.usage.steel,
      jsonData.usage.roboSteel,
      jsonData.usage.crystal,
      jsonData.usage.energyCore,
      jsonData.usage.credits
    );
    this.production = new Resources(
      jsonData.production.energy,
      jsonData.production.steel,
      jsonData.production.roboSteel,
      jsonData.production.crystal,
      jsonData.production.energyCore,
      jsonData.production.credits
    );
  }

  public GetPossibleTerrain(): Terrain[] {
    return this.possibleTerrain;
  }
  public GetBuildTime(): number {
    return this.buildTime;
  }
  public GetUsage(): Resources {
    return this.usage;
  }
  public GetProduction(): Resources {
    return this.production;
  }
}
