import PlayerData from "../types/DataTypes/playerData.js";
import Resources from "../types/resources.js";
import BattleGroup from "./BattleGroup.js";
import UpgradeList from "./UpgradeList.js";

export default class Player {
  private playerName: string;
  private resources: Resources;
  private upgradeList: UpgradeList;
  private battleGroups: BattleGroup[];
  private wasAttacked: boolean;
  private wasAttackedLastTurn: boolean;

  constructor(playerData: PlayerData) {
    this.playerName = playerData.GetPlayerName();
    this.resources = playerData.GetResources();
    this.upgradeList = new UpgradeList();
    this.battleGroups = new Array<BattleGroup>();
    this.wasAttacked = false;
    this.wasAttackedLastTurn = false;
  }

  public GetPlayerName(): string {
    return this.playerName;
  }

  public GetResources(): Resources {
    return this.resources;
  }

  public SetResources(resources: Resources) {
    this.resources.Init(resources);
  }

  public GetUpgradeList(): UpgradeList {
    return this.upgradeList;
  }

  public SetUpgradeList(upgradeList: UpgradeList): void {
    this.upgradeList = upgradeList;
  }

  public GetWasAttacked(): boolean {
    return this.wasAttacked;
  }

  public SetWasAttacked(state: boolean): void {
    this.wasAttacked = state;
  }

  public GetWasAttackedLastTurn(): boolean {
    return this.wasAttackedLastTurn;
  }

  public SetWasAttackedLastTurn(state: boolean): void {
    this.wasAttackedLastTurn = state;
  }

  public GetBattleGroups(): BattleGroup[] {
    return this.battleGroups;
  }

  public AddBattleGroup(newBattleGroup: BattleGroup): void {
    this.battleGroups.push(newBattleGroup);
  }
}
