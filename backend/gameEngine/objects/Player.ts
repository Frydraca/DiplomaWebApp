import PlayerData from "../types/DataTypes/playerData.js";
import Resources from "../types/resources.js";
import BattleGroup from "./BattleGroup.js";
import UpgradeList from "./UpgradeList.js";

export default class Player {
  private playerName: string;
  private resources: Resources;
  private upgradeList: UpgradeList;
  private battleGroups: BattleGroup[];

  constructor(playerData: PlayerData) {
    this.playerName = playerData.GetPlayerName();
    this.resources = playerData.GetResources();
    this.upgradeList = new UpgradeList();
    this.battleGroups = new Array<BattleGroup>();
  }

  GetPlayerName(): string {
    return this.playerName;
  }

  GetResources(): Resources {
    return this.resources;
  }

  SetResources(resources: Resources) {
    this.resources.Init(resources);
  }

  GetUpgradeList(): UpgradeList {
    return this.upgradeList;
  }

  SetUpgradeList(upgradeList: UpgradeList): void {
    this.upgradeList = upgradeList;
  }

  GetBattleGroups(): BattleGroup[] {
    return this.battleGroups;
  }

  AddBattleGroup(newBattleGroup: BattleGroup): void {
    this.battleGroups.push(newBattleGroup);
  }
}
