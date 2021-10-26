import { DirectionType } from "../enums/directionType.js";
import { ResourceType } from "../enums/resourceType.js";
import { UnitType } from "../enums/unitType.js";
import { UpgradeType } from "../enums/upgradeType.js";
import { ObjectName } from "../enums/objectName.js";
import BuildingData from "../types/DataTypes/buildingData.js";
import LocationType from "../types/locationType.js";
import PathNode from "../types/pathNode.js";
import PlayerData from "../types/DataTypes/playerData.js";
import Resources from "../types/resources.js";
import Building from "./Building.js";
import GameObject from "./GameObject.js";
import Player from "./Player.js";
import Tile from "./Tile.js";
import Unit from "./Unit.js";
import GameMap from "../types/gameMap.js";
import CommandCenterData from "../data/buildings/commandCenter.js";

export default class GameState {
  private turnNumber: number;
  private isRunning: boolean;
  private baseBuildingLocations: LocationType[];
  private players: Player[];
  private buildings: Building[];
  private units: Unit[];
  private tiles: Tile[];
  private savedStartingGameState: GameMap;

  constructor(startingGameState: GameMap) {
    this.savedStartingGameState = startingGameState;
    this.turnNumber = 0;
    this.isRunning = true;
    this.baseBuildingLocations = [
      new LocationType(-2, -1),
      new LocationType(-2, 1),
      new LocationType(-1, 2),
      new LocationType(-1, -2),
      new LocationType(1, -2),
      new LocationType(1, 2),
      new LocationType(2, -1),
      new LocationType(2, 1),
    ];
    this.players = new Array<Player>();
    this.tiles = new Array<Tile>();
    this.buildings = new Array<Building>();
    this.units = new Array<Unit>();

    // TODO refactor player setup
    let startingResources = new Resources(10, 30, 10, 0, 3, 0);
    let playerData1 = new PlayerData("Player", startingResources);
    let playerData2 = new PlayerData("Server AI", startingResources);
    this.players.push(new Player(playerData1));
    this.players.push(new Player(playerData2));
    startingGameState.GetTiles().forEach((element: Tile) => {
      this.tiles.push(element);
    });
    for (let i = 0; i < this.players.length; i++) {
      this.AddCommandCenter(
        this.players[i].GetPlayerName(),
        startingGameState.GetStartingLocations()[i]
      );
    }
  }

  public GetClone(): GameState {
    let ret = new GameState(this.savedStartingGameState);
    let retBuildings = ret.GetBuildings();
    retBuildings[0].SetObjectId(this.buildings[0].GetObjectId());
    retBuildings[1].SetObjectId(this.buildings[1].GetObjectId());
    return ret;
  }

  private AddCommandCenter(owner: string, location: LocationType): void {
    let buildingData = new BuildingData(CommandCenterData);
    let newBuilding = new Building(buildingData, owner);
    newBuilding.Complete();
    newBuilding.SetLocation(location);
    this.AddBuildingToTile(newBuilding, this.GetTileByLocation(location));
    this.AddBuilding(newBuilding);
  }

  public GetTurnNumber(): number {
    return this.turnNumber;
  }
  public IncreaseTurnNumber(value: number): void {
    this.turnNumber += value;
  }

  public IsRunning(): boolean {
    return this.isRunning;
  }
  public SetIsRunning(state: boolean): void {
    this.isRunning = state;
  }

  public GetPlayers(): Player[] {
    return this.players;
  }

  public GetPlayerByName(playerName: string): Player {
    return this.players.find(
      (element: Player) => element.GetPlayerName() === playerName
    );
  }

  public GetBuildings(): Building[] {
    return this.buildings;
  }

  public GetBuildingById(buildingId: number): Building {
    return this.buildings.find(
      (element: Building) => element.GetObjectId() === buildingId
    );
  }

  public GetUnits(): Unit[] {
    return this.units;
  }

  public GetUnitById(unitId: number): Unit {
    return this.units.find((element: Unit) => element.GetObjectId() === unitId);
  }

  public GetTiles(): Tile[] {
    return this.tiles;
  }

  public GetTileByLocation(location: LocationType): Tile {
    return this.tiles.find((element: Tile) =>
      element.GetLocation().SameLocation(location)
    );
  }

  public GetObjectByLocation(location: LocationType): GameObject {
    let tile = this.GetTileByLocation(location);
    if (tile.HasUnit()) {
      return this.GetUnitById(tile.GetUnitId());
    }
    if (tile.HasBuilding()) {
      return this.GetBuildingById(tile.GetBuildingId());
    }
    return null;
  }

  public ModifyResource(
    playerName: string,
    resourceType: ResourceType,
    amount: number
  ): void {
    let player = this.GetPlayerByName(playerName);
    let resources = player.GetResources();
    resources.ModifyResource(resourceType, amount);
    player.SetResources(resources); // TODO is setresources neccesery? reference question
  }

  public UpgradeStat(
    playerName: string,
    unitType: UnitType,
    upgradeType: UpgradeType
  ): void {
    let player = this.GetPlayerByName(playerName);
    let upgrades = player.GetUpgradeList();
    upgrades.SetUpgrade(unitType, upgradeType);
  }

  public AddBuildingToTile(building: Building, tile: Tile): void {
    if (this.tiles.includes(tile) && tile.IsEmpty()) {
      this.tiles
        .find((element: Tile) => element === tile)
        .SetBuildingId(building.GetObjectId());
    }
  }

  public AddUnitToTile(unit: Unit, tile: Tile): void {
    if (this.tiles.includes(tile) && tile.IsEmpty()) {
      this.tiles
        .find((element: Tile) => element === tile)
        .SetUnitId(unit.GetObjectId());
    }
  }

  public RemoveBuildingFromTile(tile: Tile): void {
    let targetTile = this.tiles.find((element: Tile) => element === tile);
    targetTile.SetBuildingId(null);
  }

  public AddBuilding(building: Building): void {
    this.buildings.push(building);
  }

  public RemoveBuilding(building: Building): void {
    this.buildings.splice(this.buildings.indexOf(building), 1);
  }

  public RemoveUnitFromTile(tile: Tile): void {
    let targetTile = this.tiles.find((element: Tile) => element === tile);
    targetTile.SetUnitId(null);
  }

  public AddUnit(unit: Unit): void {
    this.units.push(unit);
  }

  public RemoveUnit(unit: Unit): void {
    this.units.splice(this.units.indexOf(unit), 1);
  }

  public ChangeUnitLocation(unit: Unit, location: LocationType): void {
    unit.SetLocation(location);
  }

  public RemoveObject(gameObject: GameObject): void {
    let objectId = gameObject.GetObjectId();
    // TODO Do a fork based on the type of GameObject
    let building = this.GetBuildingById(objectId);
    let unit = this.GetUnitById(objectId);
    if (building !== undefined) {
      this.RemoveBuildingFromTile(
        this.GetTileByLocation(building.GetLocation())
      );
      this.RemoveBuilding(building);
    }
    if (unit !== undefined) {
      this.RemoveUnit(unit);
      this.RemoveUnitFromTile(this.GetTileByLocation(unit.GetLocation()));
    }
  }

  public GetNeighbourTile(homeTile: Tile, direction: DirectionType): Tile {
    let homeLocation = homeTile.GetLocation();
    let neighbourLocation: LocationType;
    switch (direction) {
      case DirectionType.North:
        neighbourLocation = new LocationType(
          homeLocation.GetX(),
          homeLocation.GetY() - 1
        );
        break;
      case DirectionType.East:
        neighbourLocation = new LocationType(
          homeLocation.GetX() + 1,
          homeLocation.GetY()
        );
        break;
      case DirectionType.South:
        neighbourLocation = new LocationType(
          homeLocation.GetX(),
          homeLocation.GetY() + 1
        );
        break;
      case DirectionType.West:
        neighbourLocation = new LocationType(
          homeLocation.GetX() - 1,
          homeLocation.GetY()
        );
        break;
      default:
        console.log("Error! Invalid direction type: " + direction);
        break;
    }
    let ret = this.tiles.find((element: Tile) =>
      element.GetLocation().SameLocation(neighbourLocation)
    );
    if (ret === undefined) {
      return null;
    }
    return ret;
  }

  // TODO is this function needed?
  public IsSameLocation(tile1: Tile, tile2: Tile): boolean {
    return tile1.GetLocation().SameLocation(tile2.GetLocation());
  }

  public GetDistanceBetweenTiles(tile1: Tile, tile2: Tile): number {
    return tile1.GetLocation().DistanceFrom(tile2.GetLocation());
  }

  public GetNextBuildingLocation(
    player: Player,
    building: Building
  ): LocationType {
    let commandCenter = this.GetBuildings().filter(
      (element) =>
        element.GetOwner() === player.GetPlayerName() &&
        element.GetName() === ObjectName.CommandCenter
    );
    let commandLocation = commandCenter[0].GetLocation();
    for (let i = 0; i < this.baseBuildingLocations.length; i++) {
      let tile = this.GetTileByLocation(
        new LocationType(
          commandLocation.GetX() + this.baseBuildingLocations[i].GetX(),
          commandLocation.GetY() + this.baseBuildingLocations[i].GetY()
        )
      );
      if (
        tile !== undefined &&
        tile.IsEmpty() &&
        building.IsLocationValid(tile.GetTerrain())
      ) {
        return tile.GetLocation();
      }
    }

    return null;
  }

  // TODO: Refactor
  public GetClosestBuildingLocationToCommandCenter(
    player: Player,
    building: Building
  ): LocationType {
    let ret: LocationType;
    let commandCenter = this.GetBuildings().filter(
      (element) =>
        element.GetOwner() === player.GetPlayerName() &&
        element.GetName() === "Command Center"
    );
    let commandTile = this.GetTileByLocation(commandCenter[0].GetLocation());
    let closestTile: Tile;
    let closestDistance = Number.POSITIVE_INFINITY;
    this.tiles.forEach((element: Tile) => {
      if (building.IsLocationValid(element.GetTerrain()) && element.IsEmpty()) {
        if (
          this.GetDistanceBetweenTiles(element, commandTile) < closestDistance
        ) {
          closestDistance = this.GetDistanceBetweenTiles(element, commandTile);
          closestTile = element;
          ret = closestTile.GetLocation();
        }
      }
    });
    return ret;
  }

  public GetClosestEmptyLocationToLocation(
    location: LocationType
  ): LocationType {
    let ret: LocationType;
    let centerLocation = this.GetTileByLocation(location);
    let closestTile: Tile;
    let closestDistance = Number.POSITIVE_INFINITY;
    this.tiles.forEach((element) => {
      if (element.IsEmpty()) {
        if (
          this.GetDistanceBetweenTiles(element, centerLocation) <
          closestDistance
        ) {
          closestDistance = this.GetDistanceBetweenTiles(
            element,
            centerLocation
          );
          closestTile = element;
          ret = closestTile.GetLocation();
        }
      }
    });
    return ret;
  }

  public CanAttackTarget(
    attackerObject: GameObject,
    targetObject: GameObject
  ): boolean {
    let attackerTile = this.GetTileByLocation(attackerObject.GetLocation());
    let targetTile = this.GetTileByLocation(targetObject.GetLocation());
    if (
      attackerObject.GetCanAttack() &&
      attackerObject.GetOwner() !== targetObject.GetOwner() &&
      attackerObject.GetRange() >=
        this.GetDistanceBetweenTiles(attackerTile, targetTile)
    ) {
      return true;
    }
    return false;
  }

  public FindPathBetween(
    startingTile: Tile,
    targetTile: Tile,
    playerName: string
  ): PathNode[] {
    let openList = new Array<PathNode>();
    let closedList = new Array<PathNode>();
    let startingNode = new PathNode(startingTile, null, 0, 0, 0);
    let endNode: PathNode;
    openList.push(startingNode);
    while (openList.length !== 0) {
      // Find the node with the lowest f value
      let lowestFValue = Number.POSITIVE_INFINITY;
      let currentNode: PathNode;
      openList.forEach((element: PathNode) => {
        if (element.GetF() < lowestFValue) {
          lowestFValue = element.GetF();
          currentNode = element;
        }
      });

      // Pop off the node
      let index = openList.indexOf(currentNode);
      openList.splice(index, 1);
      // Generate the 4 successor and set their parents to current
      let northNode = new PathNode(
        this.GetNeighbourTile(currentNode.GetTile(), DirectionType.North),
        currentNode,
        0,
        0,
        0
      );
      let eastNode = new PathNode(
        this.GetNeighbourTile(currentNode.GetTile(), DirectionType.East),
        currentNode,
        0,
        0,
        0
      );
      let southNode = new PathNode(
        this.GetNeighbourTile(currentNode.GetTile(), DirectionType.South),
        currentNode,
        0,
        0,
        0
      );
      let westNode = new PathNode(
        this.GetNeighbourTile(currentNode.GetTile(), DirectionType.West),
        currentNode,
        0,
        0,
        0
      );
      let successors = [northNode, eastNode, southNode, westNode];
      // discard the nodes with "null" tiles
      successors = successors.filter((element) => element.GetTile() !== null);
      // discard the non empty nodes
      successors = successors.filter(
        (element: PathNode) =>
          element.GetTile().IsEmpty() ||
          element.GetTile() === targetTile ||
          (element.GetTile().HasUnit() &&
            this.GetUnitById(element.GetTile().GetUnitId()).GetOwner() ===
              playerName)
      );

      // for each successor
      for (let i = 0; i < successors.length; i++) {
        let currentSuccessor = successors[i];
        if (this.IsSameLocation(currentSuccessor.GetTile(), targetTile)) {
          endNode = currentSuccessor;
          openList = [];
          break;
        }
        currentSuccessor.SetG(
          currentSuccessor.GetParent().GetG() +
            this.GetDistanceBetweenTiles(
              currentSuccessor.GetTile(),
              currentSuccessor.GetParent().GetTile()
            )
        );
        currentSuccessor.SetH(
          this.GetDistanceBetweenTiles(currentSuccessor.GetTile(), targetTile)
        );
        currentSuccessor.SetF(
          currentSuccessor.GetG() + currentSuccessor.GetH()
        );

        // if there is a node in the open list which has the same tile
        // and lower f score then skip this successor
        if (
          openList.find(
            (element: PathNode) =>
              element.GetTile() === currentSuccessor.GetTile() &&
              element.GetF() <= currentSuccessor.GetF()
          ) !== undefined
        ) {
          continue;
        }

        // if there is a node in the closed list which has the same tile
        // and lower f score then skip this successor
        // otherwise add the successor to the openList
        if (
          closedList.find(
            (element) =>
              element.GetTile() === currentSuccessor.GetTile() &&
              element.GetF() <= currentSuccessor.GetF()
          ) !== undefined
        ) {
          continue;
        }
        openList.push(currentSuccessor);
      }
      closedList.push(currentNode);
    }

    // return path
    if (endNode === undefined) {
      return null;
    }
    let path = new Array<PathNode>();
    let lastNode = endNode;
    let pathEnded = false;
    while (!pathEnded) {
      path.push(lastNode);
      if (lastNode.GetParent() === null) {
        pathEnded = true;
      }
      lastNode = lastNode.GetParent();
    }
    return path.reverse();
  }
}
