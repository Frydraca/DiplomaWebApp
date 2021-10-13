import GameState from "./objects/GameState.js";
import Command from "./commands/baseCommand.js";
import AddBuildingCommand from "./commands/addBuildingCommand.js";
import RemoveBuildingCommand from "./commands/removeBuildingCommand.js";
import AddUnitCommand from "./commands/addUnitCommand.js";
import RemoveUnitCommand from "./commands/removeUnitCommand.js";
import MoveUnitCommand from "./commands/moveUnitCommand.js";
import DamageObjectCommand from "./commands/damageObjectCommand.js";
import GameObject from "./objects/GameObject.js";
import Building from "./objects/Building.js";
import Unit from "./objects/Unit.js";
import Player from "./objects/Player.js";
import Tile from "./objects/Tile.js";
import BattleGroup from "./objects/BattleGroup.js";
import { BattleGroupStatus } from "./enums/battleGroupStatus.js";
import { UnitType } from "./enums/unitType.js";
import { UpgradeType } from "./enums/upgradeType.js";
import { ResourceType } from "./enums/resourceType.js";
import { ObjectType } from "./enums/objectType.js";
import { ObjectName } from "./enums/objectName.js";
import LocationType from "./types/locationType.js";
import CommandResult from "./types/commandResult.js";
import RubbleData from "./data/buildings/rubble.js";
import GameMap from "./types/gameMap.js";
import { CommandType } from "./enums/commandType.js";
import BuildingData from "./types/DataTypes/buildingData.js";

export default class GameEngine {
  private startingGameStateData: GameState;
  private gameState: GameState;
  private commands: CommandResult[][];
  private currentTurnCommands: CommandResult[];

  constructor(startingState: GameMap) {
    this.gameState = new GameState(startingState);
    this.startingGameStateData = this.gameState.GetClone();
    this.commands = new Array<CommandResult[]>();
    this.currentTurnCommands = new Array<CommandResult>();
  }

  public GetBuildingsOfGivenType(
    playerName: string,
    buildingType: ObjectName
  ): Building[] {
    return this.gameState
      .GetBuildings()
      .filter(
        (element: Building) =>
          element.GetOwner() === playerName &&
          element.GetName() === buildingType
      );
  }

  public Execute(command: Command): Command {
    if (command.Execute(this)) {
      this.currentTurnCommands.push(command.GetResult());
    }
    return command;
  }

  public IsRunning(): boolean {
    return this.gameState.IsRunning();
  }

  public TurnEnd(): void {
    this.gameState.GetUnits().forEach((unit: Unit) => {
      unit.SetHasAction(true);
    });

    this.gameState.GetPlayers().forEach((player: Player) => {
      player.SetWasAttackedLastTurn(player.GetWasAttacked());
      player.SetWasAttacked(false);
      let battleGroups = player.GetBattleGroups();
      battleGroups.forEach((group: BattleGroup) => {
        group.CheckUnits();
      });
    });
    this.UpdateResources();
    this.AdvanceRubble();
    this.CheckForGameEnd();
    this.commands.push(this.currentTurnCommands);
    this.currentTurnCommands = [];
    this.gameState.IncreaseTurnNumber(1);
  }

  public GetGameState(): GameState {
    return this.gameState;
  }

  public GetStartingGameState(): GameState {
    return this.startingGameStateData;
  }

  public GetCommands(): CommandResult[][] {
    return this.commands;
  }

  ///////////////////////
  // Command functions //
  ///////////////////////

  public AddBuilding(building: Building, location: LocationType): boolean {
    this.gameState.AddBuildingToTile(
      building,
      this.gameState.GetTileByLocation(location)
    );
    this.gameState.AddBuilding(building);
    return true;
  }

  public RemoveBuilding(building: Building): boolean {
    this.gameState.RemoveBuildingFromTile(
      this.gameState.GetTileByLocation(building.GetLocation())
    );
    this.gameState.RemoveBuilding(building);
    return true;
  }

  public AddUnit(unit: Unit, location: LocationType): boolean {
    this.gameState.AddUnitToTile(
      unit,
      this.gameState.GetTileByLocation(location)
    );
    this.gameState.AddUnit(unit);
    return true;
  }

  public RemoveUnit(unit: Unit): boolean {
    this.gameState.RemoveUnitFromTile(
      this.gameState.GetTileByLocation(unit.GetLocation())
    );
    this.gameState.RemoveUnit(unit);
    return true;
  }

  public MoveUnit(unit: Unit, location: LocationType): boolean {
    this.gameState.RemoveUnitFromTile(
      this.gameState.GetTileByLocation(unit.GetLocation())
    );
    this.gameState.AddUnitToTile(
      unit,
      this.gameState.GetTileByLocation(location)
    );
    this.gameState.ChangeUnitLocation(unit, location);
    return true;
  }

  public DamageObject(object: GameObject, damage: number): boolean {
    this.gameState.GetPlayerByName(object.GetOwner()).SetWasAttacked(true);
    return true;
  }

  public ModifyResource(
    playerName: string,
    resource: ResourceType,
    amount: number
  ): boolean {
    this.gameState.ModifyResource(playerName, resource, amount);
    return true;
  }

  public UpgradeStat(
    playerName: string,
    unitType: UnitType,
    upgradeType: UpgradeType
  ): boolean {
    this.gameState.UpgradeStat(playerName, unitType, upgradeType);
    return true;
  }

  ////////////////////////////////////
  // Functions called from aiEngine //
  ////////////////////////////////////

  public ActivateUnits(): void {
    for (let i = 0; i < this.gameState.GetUnits().length; i++) {
      let unit = this.gameState.GetUnits()[i];
      //do something
      let playerName = unit.GetOwner();
      let player = this.gameState.GetPlayerByName(playerName);

      //check if in battlegroup
      //check status
      if (unit.InGroup()) {
        let battleGroup = player
          .GetBattleGroups()
          .find(
            (group: BattleGroup) => group.GetId() === unit.GetBattleGroup()
          );
        if (battleGroup === undefined) {
          console.log("Error! Couldn't find battlegroup!");
          continue;
        }
        switch (battleGroup.GetStatus()) {
          case BattleGroupStatus.Wait:
            if (this.AttackCheck(unit, playerName)) {
              let enemy = this.GetClosestEnemy(unit);
              if (unit.InRange(enemy)) {
                this.Attack(unit, enemy);
                unit.SetHasAction(false);
              }
            }
            break;
          case BattleGroupStatus.Active:
            switch (battleGroup.GetTask()) {
              case "Attack":
                if (this.AttackCheck(unit, playerName)) {
                  this.GeneralAttackMove(unit);
                }
                break;
              case "Defend":
                if (this.AttackCheck(unit, playerName)) {
                  let enemy = this.GetClosestEnemy(unit);
                  if (unit.InRange(enemy)) {
                    this.Attack(unit, enemy);
                    unit.SetHasAction(false);
                  }
                  this.GeneralDefendMove(unit, playerName);
                }
                break;
              default:
                console.log(
                  "Error! Unrecognized battle group task: " +
                    battleGroup.GetTask()
                );
                break;
            }
            break;
          case BattleGroupStatus.Retreat:
            break;
          default:
            console.log(
              "Error! unrecognized battle group status: " +
                battleGroup.GetStatus()
            );
            break;
        }
      } else {
        if (this.AttackCheck(unit, playerName)) {
          this.GeneralAttackMove(unit);
        }
      }
    }
  }

  private GeneralAttackMove(unit: Unit): void {
    let enemy = this.GetClosestEnemy(unit);
    if (unit.InRange(enemy)) {
      this.Attack(unit, enemy);
    } else {
      this.Move(unit, this.gameState.GetTileByLocation(enemy.GetLocation()));
    }
    unit.SetHasAction(false);
  }

  private GeneralDefendMove(unit: Unit, playerName: string): void {
    // get enemies in range of command center
    let enemiesTooClose = this.FindEnemiesInRangeOfCommandcenter(
      10,
      playerName
    );
    if (enemiesTooClose.length === 0) return;
    // find the closest one out of them
    let closestEnemy: GameObject;
    let distance = Number.POSITIVE_INFINITY;
    enemiesTooClose.forEach((enemy: GameObject) => {
      if (playerName !== enemy.GetOwner() && enemy.GetOwner() !== "gaia") {
        let currentDistance = unit.GetDistanceFromObject(enemy);
        if (currentDistance < distance) {
          closestEnemy = enemy;
          distance = currentDistance;
        }
      }
    });

    if (unit.InRange(closestEnemy)) {
      this.Attack(unit, closestEnemy);
    } else {
      this.Move(
        unit,
        this.gameState.GetTileByLocation(closestEnemy.GetLocation())
      );
    }
    unit.SetHasAction(false);
  }

  public AttackCheck(unit: Unit, playerName: string): boolean {
    return (
      unit.HasAction() &&
      (this.DoesEnemyHasUnits(playerName) ||
        this.DoesEnemyHasBuildings(playerName))
    );
  }

  private FindEnemiesInRangeOfCommandcenter(
    range: number,
    playerName: string
  ): GameObject[] {
    let enemiesInRange = new Array<GameObject>();
    let commandCenter = this.gameState
      .GetBuildings()
      .filter(
        (element: Building) =>
          element.GetOwner() === playerName &&
          element.GetName() === ObjectName.CommandCenter
      )[0];
    if (commandCenter !== undefined) {
      this.gameState.GetUnits().forEach((unit) => {
        if (playerName !== unit.GetOwner()) {
          if (unit.GetDistanceFromObject(commandCenter) <= range) {
            enemiesInRange.push(unit);
          }
        }
      });
      this.gameState.GetBuildings().forEach((building) => {
        if (
          playerName !== building.GetOwner() &&
          building.GetOwner() !== "gaia"
        ) {
          if (building.GetDistanceFromObject(commandCenter) <= range) {
            enemiesInRange.push(building);
          }
        }
      });
    }
    return enemiesInRange;
  }

  public Build(building: Building): void {
    let player = this.GetOwnerOfObject(building);
    let locationResponse: LocationType;
    let buildingName = building.GetName();
    if (
      buildingName === ObjectName.CrystalMine ||
      buildingName === ObjectName.SteelMine
    ) {
      locationResponse =
        this.gameState.GetClosestBuildingLocationToCommandCenter(
          player,
          building
        );
    } else {
      locationResponse = this.gameState.GetNextBuildingLocation(
        player,
        building
      );
    }

    if (building.CanBuild(player.GetResources()) && locationResponse !== null) {
      player.SetResources(building.TakeCost(player.GetResources()));
      building.SetLocation(locationResponse);
      this.Execute(new AddBuildingCommand(building, locationResponse));
    }
  }

  public Create(unit: Unit): void {
    let player = this.GetOwnerOfObject(unit);
    let locationResponse =
      this.gameState.GetClosestEmptyLocationToCommandCenter(player);
    if (unit.CanCreate(player.GetResources()) && locationResponse !== null) {
      player.SetResources(unit.TakeCost(player.GetResources()));
      unit.SetLocation(locationResponse);
      this.Execute(new AddUnitCommand(unit, locationResponse));

      let battleGroups = player.GetBattleGroups();
      for (let i = 0; i < battleGroups.length; i++) {
        if (battleGroups[i].NeedUnitType(unit.GetUnitType())) {
          unit.AddGroupName(battleGroups[i].GetId());
          battleGroups[i].AddUnit(unit);
        }
      }
    }
  }

  public Move(unit: Unit, targetTile: Tile): void {
    let currentTile = this.gameState.GetTileByLocation(unit.GetLocation());
    let path = this.gameState.FindPathBetween(currentTile, targetTile);
    if (path === null) {
      console.log("path fail");
      return;
    }
    let newTile: Tile;
    if (path.length <= unit.GetSpeed()) {
      newTile = path[path.length - 1].GetTile();
    } else {
      newTile = path[unit.GetSpeed()].GetTile();
    }
    this.Execute(
      new MoveUnitCommand(
        unit,
        currentTile.GetLocation(),
        newTile.GetLocation()
      )
    );
  }

  public Attack(attackerObject: GameObject, targetObject: GameObject): void {
    if (this.gameState.CanAttackTarget(attackerObject, targetObject)) {
      let damageTaken = targetObject.TakeDamage(
        attackerObject.GetAttackDamage()
      );
      this.Execute(new DamageObjectCommand(targetObject, damageTaken));
      if (targetObject.GetHitPoints() < 1) {
        if (targetObject.GetName() === ObjectName.CommandCenter) {
          this.gameState.SetIsRunning(false);
        }
        //this.gameState.RemoveObject(targetObject);
        let location = targetObject.GetLocation();
        if (targetObject.GetType() === ObjectType.Building) {
          this.Execute(
            new RemoveBuildingCommand(<Building>targetObject, location)
          );
          let newBuilding = new Building(new BuildingData(RubbleData), "gaia");
          newBuilding.SetLocation(location);
          this.Execute(new AddBuildingCommand(newBuilding, location));
        } else if (targetObject.GetType() === ObjectType.Unit) {
          this.Execute(new RemoveUnitCommand(<Unit>targetObject, location));
        }
      }
    }
  }

  public AdvanceRubble(): void {
    let rubbleToDelete = new Array<number>();
    this.gameState.GetBuildings().forEach((building: Building) => {
      if (building.GetName() === ObjectName.Rubble) {
        building.IncreaseBuildProgress(1);
        if (building.IsComplete()) {
          rubbleToDelete.push(building.GetObjectId());
        }
      }
    });
    rubbleToDelete.forEach((rubbleId: number) => {
      let rubble = this.gameState.GetBuildingById(rubbleId);
      this.Execute(new RemoveBuildingCommand(rubble, rubble.GetLocation()));
    });
  }

  public CheckForGameEnd(): void {
    if (this.gameState.GetTurnNumber() >= 50) {
      this.gameState.SetIsRunning(false);
    }
  }

  public UpdateResources(): void {
    let oldPlayers = JSON.parse(JSON.stringify(this.gameState.GetPlayers()));
    this.gameState.GetBuildings().forEach((building: Building) => {
      if (building.GetOwner() !== "gaia") {
        let player = this.gameState.GetPlayerByName(building.GetOwner());
        player.SetResources(building.UpdateResources(player.GetResources()));
      }
    });
    let newPlayers = JSON.parse(JSON.stringify(this.gameState.GetPlayers()));
    this.currentTurnCommands.push(
      new CommandResult({
        type: CommandType.UpdateResource,
        oldPlayers: oldPlayers,
        newPlayers: newPlayers,
      })
    );
  }

  // TODO probably unnecessery
  private GetOwnerOfObject(object: GameObject): Player {
    return this.gameState
      .GetPlayers()
      .find((player: Player) => player.GetPlayerName() === object.GetOwner());
  }

  private GetNumberOfGameObjectsByPlayerId(
    gameObject: GameObject,
    playerName: string
  ): number {
    let number = 0;

    this.gameState.GetBuildings().forEach((building: Building) => {
      if (
        building.GetName() === gameObject.GetName() &&
        building.GetOwner() === playerName
      ) {
        number++;
      }
    });

    this.gameState.GetUnits().forEach((unit: Unit) => {
      if (
        unit.GetName() === gameObject.GetName() &&
        unit.GetOwner() === playerName
      ) {
        number++;
      }
    });
    return number;
  }

  public CheckIfPlayerWasAttacked(playerName: string): boolean {
    return this.gameState.GetPlayerByName(playerName).GetWasAttackedLastTurn();
  }

  public GetClosestEnemy(gameObject: GameObject) {
    let playerName = gameObject.GetOwner();
    let closestEnemy: GameObject;
    let distance = Number.POSITIVE_INFINITY;
    this.gameState.GetUnits().forEach((unit: Unit) => {
      if (playerName !== unit.GetOwner() && unit.GetOwner() !== "gaia") {
        let currentDistance = unit.GetDistanceFromObject(gameObject);
        if (currentDistance < distance) {
          closestEnemy = unit;
          distance = currentDistance;
        }
      }
    });
    this.gameState.GetBuildings().forEach((building) => {
      if (
        playerName !== building.GetOwner() &&
        building.GetOwner() !== "gaia"
      ) {
        let currentDistance = building.GetDistanceFromObject(gameObject);

        if (currentDistance < distance) {
          closestEnemy = building;
          distance = currentDistance;
        }
      }
    });
    return closestEnemy;
  }

  public GetNumberOfGameObjectByPlayerName(
    gameObject: GameObject,
    playerName: string
  ): number {
    let count = 0;

    this.gameState.GetBuildings().forEach((building) => {
      if (
        building.GetName() === gameObject.GetName() &&
        building.GetOwner() === playerName
      ) {
        count++;
      }
    });

    this.gameState.GetUnits().forEach((unit) => {
      if (
        unit.GetName() === gameObject.GetName() &&
        unit.GetOwner() === playerName
      ) {
        count++;
      }
    });

    return count;
  }

  public GetPercentageOfUnitByPlayer(
    gameObject: GameObject,
    playerName: string
  ): number {
    let count = 0;
    let totalCount = 0;

    this.gameState.GetUnits().forEach((unit) => {
      if (
        unit.GetName() === gameObject.GetName() &&
        unit.GetOwner() === playerName
      ) {
        count++;
      }
      if (unit.GetOwner() === playerName) totalCount++;
    });
    if (totalCount === 0) return 0;

    return (count / totalCount) * 100;
  }

  public DoesEnemyHasUnits(playerName: string): boolean {
    let enemyHasUnit = false;
    this.gameState.GetUnits().forEach((unit: Unit) => {
      if (playerName !== unit.GetOwner() && unit.GetOwner() !== "gaia") {
        enemyHasUnit = true;
      }
    });
    return enemyHasUnit;
  }

  public DoesEnemyHasBuildings(playerName: string): boolean {
    let enemyHasBuilding = false;
    this.gameState.GetBuildings().forEach((building: Building) => {
      if (
        playerName !== building.GetOwner() &&
        building.GetOwner() !== "gaia"
      ) {
        enemyHasBuilding = true;
      }
    });
    return enemyHasBuilding;
  }
}
