import { CommandType } from "../enums/commandType.js";
import { UnitType } from "../enums/unitType.js";
import { UpgradeType } from "../enums/upgradeType.js";
import GameEngine from "../gameEngine.js";
import CommandResult from "../types/commandResult.js";
import Command from "./baseCommand.js";

export default class UpgradeCommand extends Command {
  private playerName: string;
  private unitType: UnitType;
  private upgradeType: UpgradeType;

  constructor(
    playerName: string,
    unitType: UnitType,
    upgradeType: UpgradeType
  ) {
    super(CommandType.Upgrade);
    this.playerName = playerName;
    this.unitType = unitType;
    this.upgradeType = upgradeType;
  }

  public Execute(game: GameEngine): boolean {
    return game.UpgradeStat(this.playerName, this.unitType, this.upgradeType);
  }

  public GetPlayerName(): string {
    return this.playerName;
  }

  // TODO ret Type
  public GetResult(): CommandResult {
    let ret = {
      type: CommandType.Upgrade,
      playerId: JSON.parse(JSON.stringify(this.playerName)),
      unitType: JSON.parse(JSON.stringify(this.unitType)),
      statType: JSON.parse(JSON.stringify(this.upgradeType)),
    };
    return new CommandResult(ret);
  }
}
