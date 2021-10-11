import Resources from "../resources.js";

export default class PlayerData {
  private playerName: string;
  private resources: Resources;

  constructor(playerName: string, startingResources: Resources) {
    this.playerName = playerName;
    this.resources = new Resources(
      startingResources.GetEnergy(),
      startingResources.GetSteel(),
      startingResources.GetRoboSteel(),
      startingResources.GetCrystal(),
      startingResources.GetEnergyCore(),
      startingResources.GetCredits()
    );
  }

  public GetPlayerName(): string {
    return this.playerName;
  }
  public GetResources(): Resources {
    return this.resources;
  }
}
