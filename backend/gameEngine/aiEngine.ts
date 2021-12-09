import GameEngine from "./gameEngine.js";
import ModifyResourceCommand from "./commands/modifyResourceCommand.js";
import UpgradeCommand from "./commands/upgradeCommand.js";
import GameObject from "./objects/GameObject.js";
import Building from "./objects/Building.js";
import Unit from "./objects/Unit.js";
import BattleGroup from "./objects/BattleGroup.js";
import { ResourceType } from "./enums/resourceType.js";
import { UnitType } from "./enums/unitType.js";
import { UpgradeType } from "./enums/upgradeType.js";
import { ObjectName } from "./enums/objectName.js";
import { ObjectType } from "./enums/objectType.js";
import { TacticType } from "./enums/tacticType.js";
import BuildingData from "./types/DataTypes/buildingData.js";
import UnitData from "./types/DataTypes/unitData.js";
import Group from "./types/group.js";
import GroupElement from "./types/groupElement.js";
import Tactic from "./types/TacticTypes/tactic.js";
import RetreatTactic from "./types/TacticTypes/retreatTactic.js";
import FocusFireTactic from "./types/TacticTypes/focusFireTactic.js";
import ExpectedUnit from "./types/expectedUnit.js";
import PricesData from "./data/prices.js";
import UpgradeCostCollectionData from "./data/upgradeCostCollectionData.js";
import SteelMineData from "./data/buildings/steelMine.js";
import SolarPowerPlantData from "./data/buildings/solarPowerPlant.js";
import CrystalMineData from "./data/buildings/crystalMine.js";
import FoundryData from "./data/buildings/foundry.js";
import CoreFactoryData from "./data/buildings/coreFactory.js";
import WorkshopData from "./data/buildings/workshop.js";
import ArtilleryBotData from "./data/units/artilleryBot.js";
import AttackBotData from "./data/units/attackBot.js";
import RaiderBotData from "./data/units/raiderBot.js";
import TankBotData from "./data/units/tankBot.js";
import GameMap from "./types/gameMap.js";

export default class AiEngine {
  private players: string[];
  private game: GameEngine;
  private pScript = "";
  private sScript = "";
  private prices: PricesData;
  private upgradeCostData: UpgradeCostCollectionData;

  public constructor(
    playerIds: string[],
    playerScript: string,
    serverScript: string,
    startingGameState: {
      name: string;
      width: number;
      height: number;
      tiles: { location: number[]; terrain: string }[];
      startingLocations: [number[]];
    }
  ) {
    this.players = playerIds;

    this.game = new GameEngine(new GameMap(startingGameState));
    playerScript = playerScript.replace(/playerId/g, "this.players[0]");
    this.pScript = playerScript.replace(/enemyId/g, "this.players[1]");
    serverScript = serverScript.replace(/playerId/g, "this.players[1]");
    this.sScript = serverScript.replace(/enemyId/g, "this.players[0]");
    this.prices = new PricesData();
    this.upgradeCostData = new UpgradeCostCollectionData();
  }

  public GetGame(): GameEngine {
    return this.game;
  }

  // Main run function
  public RunGame(): void {
    while (this.game.IsRunning()) {
      //script Player
      //console.log(this.pScript);

      eval(this.pScript);

      //script Server AI

      // console.log("serverScript");
      // console.log(this.sScript);
      if (this.game.IsRunning()) {
        eval(this.sScript);
      }
      this.game.CalculateNextCenterForBattleGroups();
      this.game.ActivateUnits();
      this.game.TurnEnd();
    }
  }

  /////////////////////////////////
  // Script interpeter functions //
  /////////////////////////////////

  private Build(playerName: string, buildingType: ObjectName): void {
    let buildingData: BuildingData;

    switch (buildingType) {
      case ObjectName.CommandCenter:
        console.log("Error: Cant build new command centers!"); //TODO error handling
        break;
      case ObjectName.SteelMine:
        buildingData = new BuildingData(SteelMineData);
        break;
      case ObjectName.SolarPowerPlant:
        buildingData = new BuildingData(SolarPowerPlantData);
        break;
      case ObjectName.CrystalMine:
        buildingData = new BuildingData(CrystalMineData);
        break;
      case ObjectName.Foundry:
        buildingData = new BuildingData(FoundryData);
        break;
      case ObjectName.CoreFactory:
        buildingData = new BuildingData(CoreFactoryData);
        break;
      case ObjectName.Workshop:
        buildingData = new BuildingData(WorkshopData);
        break;
      default:
        console.log("Error! Wrong type: " + buildingType);
        break;
    }

    let newBuilding = new Building(buildingData, playerName);
    this.game.Build(newBuilding);
  }

  private BuildUpTo(playerName: string, buildingGroup: Group): void {
    if (buildingGroup.GetGroupType() !== ObjectType.Building) {
      console.log("Error: wrong type! Type: " + buildingGroup.GetGroupType());
      return;
    }

    buildingGroup.GetGroupElements().forEach((element: GroupElement) => {
      let buildingType = element.GetObjectName();
      let numberOfNeededBuildings =
        element.GetObjectCount() -
        this.game.GetBuildingsOfGivenType(playerName, buildingType).length;

      for (let i = 0; i < numberOfNeededBuildings; i++) {
        this.Build(playerName, buildingType);
      }
    });
  }

  private Create(playerName: string, unitType: UnitType): void {
    let player = this.game.GetGameState().GetPlayerByName(playerName);
    let upgradesForUnit = player.GetUpgradeList().GetUpgradesForType(unitType);

    let unitData: UnitData;

    switch (unitType) {
      case UnitType.ArtilleryBot:
        unitData = new UnitData(ArtilleryBotData);
        break;
      case UnitType.AttackBot:
        unitData = new UnitData(AttackBotData);
        break;
      case UnitType.RaiderBot:
        unitData = new UnitData(RaiderBotData);
        break;
      case UnitType.TankBot:
        unitData = new UnitData(TankBotData);
        break;
      default:
        console.log("Error! Wrong type: " + unitType);
        break;
    }
    let newUnit = new Unit(unitData, playerName);

    // TODO maybe custom numbers and not only +1s
    if (upgradesForUnit.GetAttack()) {
      newUnit.UpgradeAttackDamage(2);
    }
    if (upgradesForUnit.GetArmor()) {
      newUnit.UpgradeArmor(2);
    }
    if (upgradesForUnit.GetHitPoints()) {
      newUnit.UpgradeHitPoints(10);
    }
    if (upgradesForUnit.GetSpeed()) {
      newUnit.UpgradeSpeed(1);
    }
    this.game.Create(newUnit);
  }

  private CreateNTimes(
    playerName: string,
    unitType: UnitType,
    amount: number
  ): void {
    for (let i = 0; i < amount; i++) {
      this.Create(playerName, unitType);
    }
  }

  private Group(type: ObjectType, ...elements: GroupElement[]): Group {
    return new Group(type, elements);
  }

  private GroupElement(objectName: ObjectName, count: number): GroupElement {
    return new GroupElement(objectName, count);
  }

  private GetNumberOfOwn(playerName: string, objectName: ObjectName): number {
    let object = this.MakeObjectFromType(objectName, playerName);
    return this.game.GetNumberOfGameObjectByPlayerName(object, playerName);
  }

  private GetPercentageOfOwn(
    playerName: string,
    objectName: ObjectName
  ): number {
    let object = this.MakeObjectFromType(objectName, playerName);
    return this.game.GetPercentageOfUnitByPlayer(object, playerName);
  }

  private Have(
    playerName: string,
    objectName: ObjectName,
    upgradeType?: UpgradeType
  ): boolean {
    if (upgradeType === undefined) {
      if (this.GetNumberOfOwn(playerName, objectName) > 0) return true;
      else return false;
    }
    let player = this.game.GetGameState().GetPlayerByName(playerName);
    return player
      .GetUpgradeList()
      .GetUpgradesForType(<UnitType>(<unknown>objectName))
      .GetUpgrade(upgradeType);
  }

  private PlayerWasAttacked(playerName: string): boolean {
    return this.game.CheckIfPlayerWasAttacked(playerName);
  }

  private Trading(
    playerName: string,
    ...tradeRules: ((
      playerName: string,
      resourceType: ResourceType,
      value: number
    ) => void)[]
  ): void {
    for (let i = 0; i < tradeRules.length; i++) {
      tradeRules[i];
    }
  }

  private Buy(playerName: string, resource: ResourceType, value: number): void {
    let player = this.game.GetGameState().GetPlayerByName(playerName);
    let resources = player.GetResources();

    if (
      value > resources.GetResource(resource) &&
      resources.GetCredits() >= this.prices.GetResourcePrice(resource)
    ) {
      let neededAmount = value - resources.GetResource(resource);
      let priceAmount = Math.floor(
        resources.GetResource(ResourceType.Credits) /
          this.prices.GetResourcePrice(resource)
      );
      let amount = Math.min(neededAmount, priceAmount);
      let price = amount * this.prices.GetResourcePrice(resource) * -1;
      this.game.Execute(
        new ModifyResourceCommand(playerName, resource, amount)
      );
      this.game.Execute(
        new ModifyResourceCommand(playerName, ResourceType.Credits, price)
      );
    }
  }

  private Sell(
    playerName: string,
    resource: ResourceType,
    value: number
  ): void {
    let player = this.game.GetGameState().GetPlayerByName(playerName);
    let resources = player.GetResources();

    if (value < resources.GetResource(resource)) {
      let amount = value - resources.GetResource(resource);
      let price = amount * this.prices.GetResourcePrice(resource) * -1; // amount is negative
      this.game.Execute(
        new ModifyResourceCommand(playerName, resource, amount)
      );
      this.game.Execute(
        new ModifyResourceCommand(playerName, ResourceType.Credits, price)
      );
    }
  }

  private Research(
    playerName: string,
    ...upgradeOrders: ((
      playerName: string,
      unitType: UnitType,
      upgradeType: UpgradeType
    ) => void)[]
  ) {
    for (let i = 0; i < upgradeOrders.length; i++) {
      upgradeOrders[i];
    }
  }

  private UpgradeStats(
    playerName: string,
    unitType: UnitType,
    upgradeType: UpgradeType
  ): void {
    let player = this.game.GetGameState().GetPlayerByName(playerName);
    let resources = player.GetResources();
    let neededResources = this.upgradeCostData
      .GetUpgradeCostsOfUnitType(unitType)
      .GetUpgradeCost(upgradeType);
    if (
      player
        .GetUpgradeList()
        .GetUpgradesForType(unitType)
        .GetUpgrade(upgradeType)
    ) {
      return;
    }

    if (!resources.HasMoreOrEqualThan(neededResources)) {
      return;
    }

    if (neededResources.GetCredits() !== 0) {
      let negativeValue = 0 - neededResources.GetCredits();
      this.game.Execute(
        new ModifyResourceCommand(
          playerName,
          ResourceType.Credits,
          negativeValue
        )
      );
    }
    if (neededResources.GetCrystal() !== 0) {
      let negativeValue = 0 - neededResources.GetCrystal();
      this.game.Execute(
        new ModifyResourceCommand(
          playerName,
          ResourceType.Crystal,
          negativeValue
        )
      );
    }
    if (neededResources.GetEnergy() !== 0) {
      let negativeValue = 0 - neededResources.GetEnergy();
      this.game.Execute(
        new ModifyResourceCommand(
          playerName,
          ResourceType.Energy,
          negativeValue
        )
      );
    }
    if (neededResources.GetEnergyCore() !== 0) {
      let negativeValue = 0 - neededResources.GetEnergyCore();
      this.game.Execute(
        new ModifyResourceCommand(
          playerName,
          ResourceType.EnergyCore,
          negativeValue
        )
      );
    }
    if (neededResources.GetRoboSteel() !== 0) {
      let negativeValue = 0 - neededResources.GetRoboSteel();
      this.game.Execute(
        new ModifyResourceCommand(
          playerName,
          ResourceType.RoboSteel,
          negativeValue
        )
      );
    }
    if (neededResources.GetSteel() !== 0) {
      let negativeValue = 0 - neededResources.GetSteel();
      this.game.Execute(
        new ModifyResourceCommand(playerName, ResourceType.Steel, negativeValue)
      );
    }

    this.game.Execute(new UpgradeCommand(playerName, unitType, upgradeType));
  }

  private CombatGroup(
    playerName: string,
    groupId: number,
    group: Group,
    task: string,
    ...tactics: Tactic[]
  ): void {
    let player = this.game.GetGameState().GetPlayerByName(playerName);
    let battleGroup = player
      .GetBattleGroups()
      .find((element: BattleGroup) => element.GetId() === groupId);
    if (undefined === battleGroup) {
      let expectedUnits = new Array<ExpectedUnit>();
      group.GetGroupElements().forEach((element: GroupElement) => {
        for (let i = 0; i < element.GetObjectCount(); i++) {
          expectedUnits.push(
            new ExpectedUnit(element.GetUnitType(), false, null)
          );
        }
      });

      let newBattleGroup = new BattleGroup(
        playerName,
        groupId,
        expectedUnits,
        task,
        tactics
      );
      player.AddBattleGroup(newBattleGroup);
    } else if (!battleGroup.HasAllUnits()) {
      let missingUnits = battleGroup.GetMissingUnits();
      missingUnits.forEach((unitName: UnitType) => {
        this.Create(playerName, unitName);
      });
    }
  }

  private RetreatTactic(
    groupRetreatValue: number,
    individualRetreatAllowed: boolean,
    individualRetreatPercentage: number
  ): RetreatTactic {
    return new RetreatTactic(
      TacticType.Retreat,
      true,
      groupRetreatValue,
      individualRetreatAllowed,
      individualRetreatPercentage
    );
  }

  private FocusFireTactic(
    focusFireTarget: string,
    focusOnlyUnits: boolean
  ): FocusFireTactic {
    return new FocusFireTactic(
      TacticType.FocusFire,
      true,
      focusFireTarget,
      focusOnlyUnits
    );
  }

  private Do(action) {
    return action;
  }

  // helper functions
  private MakeObjectFromType(
    objectName: ObjectName,
    playerName: string
  ): GameObject {
    let returnObject: GameObject;
    switch (objectName) {
      case ObjectName.CommandCenter:
        console.log("Error: Cant build new command centers!"); //TODO error handling
        break;
      case ObjectName.SteelMine:
        returnObject = new Building(
          new BuildingData(SteelMineData),
          playerName
        );
        break;
      case ObjectName.SolarPowerPlant:
        returnObject = new Building(
          new BuildingData(SolarPowerPlantData),
          playerName
        );
        break;
      case ObjectName.CrystalMine:
        returnObject = new Building(
          new BuildingData(CrystalMineData),
          playerName
        );
        break;
      case ObjectName.Foundry:
        returnObject = new Building(new BuildingData(FoundryData), playerName);
        break;
      case ObjectName.CoreFactory:
        returnObject = new Building(
          new BuildingData(CoreFactoryData),
          playerName
        );
        break;
      case ObjectName.Workshop:
        returnObject = new Building(new BuildingData(WorkshopData), playerName);
        break;
      case ObjectName.ArtilleryBot:
        returnObject = new Unit(new UnitData(ArtilleryBotData), playerName);
        break;
      case ObjectName.AttackBot:
        returnObject = new Unit(new UnitData(AttackBotData), playerName);
        break;
      case ObjectName.RaiderBot:
        returnObject = new Unit(new UnitData(RaiderBotData), playerName);
        break;
      case ObjectName.TankBot:
        returnObject = new Unit(new UnitData(TankBotData), playerName);
        break;
      default:
        console.log("Error! Wrong type: " + objectName);
        break;
    }
    return returnObject;
  }
}
