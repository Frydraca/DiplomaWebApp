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
import WorkshopData from "./data/buildings/workshop.js";
import GameMap from "./types/gameMap.js";
import { CommandType } from "./enums/commandType.js";
import BuildingData from "./types/DataTypes/buildingData.js";
import { UnitStatus } from "./enums/unitStatus.js";
import { FocusTarget } from "./enums/FocusTarget.js";

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
        group.CheckRetreat();
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

  public CalculateNextCenterForBattleGroups(): void {
    this.gameState.GetPlayers().forEach((player: Player) => {
      player.GetBattleGroups().forEach((battleGroup: BattleGroup) => {
        let slowestSpeed = battleGroup.GetSlowestUnitSpeed();
        let closestEnemy = this.GetClosestEnemyToLocation(
          battleGroup.GetCenterLocationOfGroup(),
          player.GetPlayerName()
        );
        if (closestEnemy !== undefined) {
          let path = this.gameState.FindPathBetween(
            this.gameState.GetTileByLocation(
              battleGroup.GetCenterLocationOfGroup()
            ),
            this.gameState.GetTileByLocation(closestEnemy.GetLocation()),
            player.GetPlayerName()
          );
          if (path !== null && slowestSpeed < path.length) {
            battleGroup.SetTargetCenterLocation(
              path[slowestSpeed].GetTile().GetLocation()
            );
          } else {
            battleGroup.SetTargetCenterLocation(
              battleGroup.GetCenterLocationOfGroup()
            );
          }
        }
      });
    });
  }

  public ActivateUnits(): void {
    for (let i = 0; i < this.gameState.GetUnits().length; i++) {
      let unit = this.gameState.GetUnits()[i];
      //do something
      let playerName = unit.GetOwner();
      let player = this.gameState.GetPlayerByName(playerName);

      if (unit.GetStatus() === UnitStatus.Retreating) {
        let closestWorkshop = this.GetClosestWorkshop(unit);
        // TODO repair distance rework
        if (closestWorkshop !== null) {
          if (closestWorkshop.GetDistanceFromObject(unit) < 4) {
            let hpDiff = unit.GetHitPoints() - unit.GetMaxHitPoints();
            unit.Repair(5); // TODO repair value rework
            this.Execute(new DamageObjectCommand(unit, Math.max(-5, hpDiff)));
            unit.SetHasAction(false);
          } else {
            this.Retreat(unit, closestWorkshop);
          }
        }
        continue;
      }

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

        let closestWorkshop = this.GetClosestWorkshop(unit);
        if (
          closestWorkshop !== null &&
          battleGroup.IsIndividualRetreatAllowed() &&
          unit.GetPercentageHP() <= battleGroup.GetIndividualRetreatTreshold()
        ) {
          this.Retreat(unit, closestWorkshop);
          continue;
        }

        switch (battleGroup.GetStatus()) {
          case BattleGroupStatus.Wait:
            if (this.AttackCheck(unit, playerName)) {
              let enemiesInRange = this.FindEnemiesInRangeOfUnit(unit);
              if (enemiesInRange.length > 0) {
                switch (battleGroup.GetFocusTarget()) {
                  case FocusTarget.Closest:
                    let enemy = this.GetClosestEnemy(unit);
                    this.Attack(unit, enemy);
                    break;
                  case FocusTarget.LowestHP:
                    let lowestEnemy =
                      this.GetLowestEnemyFromList(enemiesInRange);
                    this.Attack(unit, lowestEnemy);
                    break;
                  case FocusTarget.HighestDamage:
                    let strongestEnemy =
                      this.GetStrongestEnemyFromList(enemiesInRange);
                    this.Attack(unit, strongestEnemy);
                    break;
                  default:
                    break;
                }
                unit.SetHasAction(false);
              }
            }
            break;
          case BattleGroupStatus.Active:
            switch (battleGroup.GetTask()) {
              case "Attack":
                if (this.AttackCheck(unit, playerName)) {
                  this.GeneralAttackMove(unit, battleGroup);
                }
                break;
              case "Defend":
                if (this.AttackCheck(unit, playerName)) {
                  let enemiesInRange = this.FindEnemiesInRangeOfUnit(unit);
                  if (enemiesInRange.length > 0) {
                    switch (battleGroup.GetFocusTarget()) {
                      case FocusTarget.Closest:
                        let enemy = this.GetClosestEnemy(unit);
                        this.Attack(unit, enemy);
                        break;
                      case FocusTarget.LowestHP:
                        let lowestEnemy =
                          this.GetLowestEnemyFromList(enemiesInRange);
                        this.Attack(unit, lowestEnemy);
                        break;
                      case FocusTarget.HighestDamage:
                        let strongestEnemy =
                          this.GetStrongestEnemyFromList(enemiesInRange);
                        this.Attack(unit, strongestEnemy);
                        break;
                      default:
                        break;
                    }
                    unit.SetHasAction(false);
                  } else {
                    this.GeneralDefendMove(unit, battleGroup);
                  }
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
            if (closestWorkshop !== null) {
              if (closestWorkshop.GetDistanceFromObject(unit) < 4) {
                let hpDiff = unit.GetHitPoints() - unit.GetMaxHitPoints();
                unit.Repair(5); // TODO repair value rework
                this.Execute(
                  new DamageObjectCommand(unit, Math.max(-5, hpDiff))
                );
                unit.SetHasAction(false);
              } else {
                this.Retreat(unit, closestWorkshop);
              }
            }
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
          this.GeneralAttackMove(unit, null);
        }
      }
    }
  }

  private GeneralAttackMove(unit: Unit, battleGroup: BattleGroup): void {
    let enemiesInRange = this.FindEnemiesInRangeOfUnit(unit);
    if (battleGroup !== null && enemiesInRange.length > 0) {
      switch (battleGroup.GetFocusTarget()) {
        case FocusTarget.Closest:
          let enemy = this.GetClosestEnemy(unit);
          this.Attack(unit, enemy);
          break;
        case FocusTarget.LowestHP:
          let lowestEnemy = this.GetLowestEnemyFromList(enemiesInRange);
          this.Attack(unit, lowestEnemy);
          break;
        case FocusTarget.HighestDamage:
          let strongestEnemy = this.GetStrongestEnemyFromList(enemiesInRange);
          this.Attack(unit, strongestEnemy);
          break;
        default:
          break;
      }
    } else if (battleGroup !== null && enemiesInRange.length === 0) {
      let enemy = this.GetClosestEnemyToLocation(
        battleGroup.GetCenterLocationOfGroup(),
        unit.GetOwner()
      );
      if (
        unit.GetDistanceFromLocation(battleGroup.GetCenterLocationOfGroup()) < 2
      ) {
        this.Move(
          unit,
          this.gameState.GetTileByLocation(enemy.GetLocation()),
          battleGroup.GetSlowestUnitSpeed()
        );
      } else {
        this.Move(
          unit,
          this.gameState.GetTileByLocation(
            this.gameState.GetClosestEmptyLocationToLocation(
              battleGroup.GetTargetCenterLocation()
            )
          ),
          unit.GetSpeed()
        );
      }
    } else {
      let enemy = this.GetClosestEnemy(unit);
      if (unit.InRange(enemy)) {
        this.Attack(unit, enemy);
      } else {
        this.Move(
          unit,
          this.gameState.GetTileByLocation(enemy.GetLocation()),
          unit.GetSpeed()
        );
      }
    }

    unit.SetHasAction(false);
  }

  private GeneralDefendMove(unit: Unit, battleGroup: BattleGroup): void {
    // get enemies in range of command center
    let enemiesTooClose = this.FindEnemiesInRangeOfCommandcenter(
      10,
      unit.GetOwner()
    );
    if (enemiesTooClose.length === 0) return;
    // find the closest one out of them
    let closestEnemy: GameObject;
    let distance = Number.POSITIVE_INFINITY;
    enemiesTooClose.forEach((enemy: GameObject) => {
      if (unit.GetOwner() !== enemy.GetOwner() && enemy.GetOwner() !== "gaia") {
        let currentDistance = unit.GetDistanceFromObject(enemy);
        if (currentDistance < distance) {
          closestEnemy = enemy;
          distance = currentDistance;
        }
      }
    });

    let enemiesInRange = this.FindEnemiesInRangeOfUnit(unit);
    if (battleGroup !== null && enemiesInRange.length > 0) {
      switch (battleGroup.GetFocusTarget()) {
        case FocusTarget.Closest:
          let enemy = this.GetClosestEnemy(unit);
          this.Attack(unit, enemy);
          break;
        case FocusTarget.LowestHP:
          let lowestEnemy = this.GetLowestEnemyFromList(enemiesInRange);
          this.Attack(unit, lowestEnemy);
          break;
        case FocusTarget.HighestDamage:
          let strongestEnemy = this.GetStrongestEnemyFromList(enemiesInRange);
          this.Attack(unit, strongestEnemy);
          break;
        default:
          break;
      }
    } else if (battleGroup !== null && enemiesInRange.length === 0) {
      let enemy = this.GetClosestEnemyToLocation(
        battleGroup.GetCenterLocationOfGroup(),
        unit.GetOwner()
      );
      if (
        unit.GetDistanceFromLocation(battleGroup.GetCenterLocationOfGroup()) < 2
      ) {
        this.Move(
          unit,
          this.gameState.GetTileByLocation(enemy.GetLocation()),
          battleGroup.GetSlowestUnitSpeed()
        );
      } else {
        this.Move(
          unit,
          this.gameState.GetTileByLocation(
            this.gameState.GetClosestEmptyLocationToLocation(
              battleGroup.GetTargetCenterLocation()
            )
          ),
          unit.GetSpeed()
        );
      }
    } else {
      if (unit.InRange(closestEnemy)) {
        this.Attack(unit, closestEnemy);
      } else {
        this.Move(
          unit,
          this.gameState.GetTileByLocation(closestEnemy.GetLocation()),
          unit.GetSpeed()
        );
      }
    }

    unit.SetHasAction(false);
  }

  private AttackCheck(unit: Unit, playerName: string): boolean {
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

  private FindEnemiesInRangeOfUnit(baseUnit: Unit): GameObject[] {
    let enemiesInRange = new Array<GameObject>();

    this.gameState.GetUnits().forEach((unit) => {
      if (baseUnit.GetOwner() !== unit.GetOwner()) {
        if (unit.GetDistanceFromObject(baseUnit) <= baseUnit.GetRange()) {
          enemiesInRange.push(unit);
        }
      }
    });
    this.gameState.GetBuildings().forEach((building) => {
      if (
        baseUnit.GetOwner() !== building.GetOwner() &&
        building.GetOwner() !== "gaia"
      ) {
        if (building.GetDistanceFromObject(baseUnit) <= baseUnit.GetRange()) {
          enemiesInRange.push(building);
        }
      }
    });

    return enemiesInRange;
  }

  private GetLowestEnemyFromList(enemies: GameObject[]): GameObject {
    let lowestEnemy = null;
    let lowestHP = Number.POSITIVE_INFINITY;
    enemies.forEach((enemy: GameObject) => {
      if (enemy.GetHitPoints() < lowestHP) {
        lowestEnemy = enemy.GetHitPoints();
        lowestEnemy = enemy;
      }
    });
    return lowestEnemy;
  }

  private GetStrongestEnemyFromList(enemies: GameObject[]): GameObject {
    let strongestEnemy = null;
    let highestDamage = Number.POSITIVE_INFINITY;
    enemies.forEach((enemy: GameObject) => {
      if (enemy.GetAttackDamage() < highestDamage) {
        highestDamage = enemy.GetAttackDamage();
        strongestEnemy = enemy;
      }
    });
    return strongestEnemy;
  }

  private Retreat(unit: Unit, workshop: Building): void {
    this.Move(
      unit,
      this.gameState.GetTileByLocation(workshop.GetLocation()),
      unit.GetSpeed()
    );
    unit.SetHasAction(false);
    unit.SetStatus(UnitStatus.Retreating);
  }

  private GetClosestWorkshop(unit: Unit): Building {
    let player = this.gameState.GetPlayerByName(unit.GetOwner());
    let workshops = this.GetBuildingsOfGivenType(
      player.GetPlayerName(),
      ObjectName.Workshop
    );
    let distance = Number.POSITIVE_INFINITY;
    let closestWorkshop = null;
    workshops.forEach((ws: Building) => {
      let currentDistance = ws.GetDistanceFromObject(unit);
      if (currentDistance < distance) {
        currentDistance = distance;
        closestWorkshop = ws;
      }
    });

    return closestWorkshop;
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
    let commandCenter = this.gameState
      .GetBuildings()
      .filter(
        (element) =>
          element.GetOwner() === player.GetPlayerName() &&
          element.GetName() === "Command Center"
      );
    let locationResponse = this.gameState.GetClosestEmptyLocationToLocation(
      commandCenter[0].GetLocation()
    );
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

  public Move(unit: Unit, targetTile: Tile, unitSpeed: number): void {
    let currentTile = this.gameState.GetTileByLocation(unit.GetLocation());
    let path = this.gameState.FindPathBetween(
      currentTile,
      targetTile,
      unit.GetOwner()
    );
    if (path === null) {
      console.log("path fail");
      return;
    }
    let newTile: Tile;
    let reducer = 0;
    if (path.length - 1 <= unitSpeed) {
      newTile = path[path.length - 2].GetTile();
    } else {
      newTile = path[unitSpeed].GetTile();
    }
    while (
      !newTile.IsEmpty() ||
      newTile.GetLocation().SameLocation(unit.GetLocation())
    ) {
      reducer++;
      if (unitSpeed - reducer < 0) {
        newTile = path[0].GetTile();
        break;
      }
      if (unitSpeed - reducer >= path.length) continue;
      newTile = path[unitSpeed - reducer].GetTile();
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
    if (this.gameState.GetTurnNumber() >= 100) {
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

  public CheckIfPlayerWasAttacked(playerName: string): boolean {
    return this.gameState.GetPlayerByName(playerName).GetWasAttackedLastTurn();
  }

  public GetClosestEnemy(gameObject: GameObject): GameObject {
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

  public GetClosestEnemyToLocation(
    location: LocationType,
    playerName: string
  ): GameObject {
    let closestEnemy: GameObject;
    let distance = Number.POSITIVE_INFINITY;
    this.gameState.GetUnits().forEach((unit: Unit) => {
      if (playerName !== unit.GetOwner() && unit.GetOwner() !== "gaia") {
        let currentDistance = unit.GetDistanceFromLocation(location);
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
        let currentDistance = building.GetDistanceFromLocation(location);

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
