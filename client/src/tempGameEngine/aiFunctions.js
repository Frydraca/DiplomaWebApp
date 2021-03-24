import Building from "./buildings/Building";
import { BuildCommand } from "./commands/buildCommand";
import SteelMineData from "./data/buildings/steelMine";
import SolarPowerPlantData from "./data/buildings/solarPowerPlant";
import CrystalMineData from "./data/buildings/crystalMine";
import CoreFactoryData from "./data/buildings/coreFactory";
import FoundryData from "./data/buildings/foundry";
import WorkshopData from "./data/buildings/workshop";

export function Do(action) {
  return action;
}

export function Build(gameEngine, playerId, buildingData) {
  buildingData.owner = playerId;
  let newBuilding = new Building(buildingData);
  gameEngine.Execute(new BuildCommand(newBuilding));
}

export function BuildUpTo(gameEngine, playerId, buildingGroup) {
  if (buildingGroup.groupType !== "Building") {
    console.log("Error: wrong type! Type: " + buildingGroup.groupType);
  }

  let currentBuildings = gameEngine.GetBuildingsOfPlayer(playerId);

  buildingGroup.elements.forEach((element) => {
    let numberOfNeededBuildings = 0;
    let buildingType = {};
    switch (element.gameObject.name) {
      case "Command Center":
        console.log("Error: Cant build new command centers!"); //TODO error handling
        break;
      case "Steel Mine":
        buildingType = SteelMineData;
        break;
      case "Solar Power Plant":
        buildingType = SolarPowerPlantData;
        break;
      case "Crystal Mine":
        buildingType = CrystalMineData;
        break;
      case "Foundry":
        buildingType = FoundryData;
        break;
      case "Core Factory":
        buildingType = CoreFactoryData;
        break;
      case "Workshop":
        buildingType = WorkshopData;
        break;
      default:
        break;
    }
    numberOfNeededBuildings =
      element.number -
      gameEngine.GetBuildingsOfGivenType(playerId, buildingType).length;

    for (let i = 0; i < numberOfNeededBuildings; i++) {
      Build(gameEngine, playerId, buildingType);
    }
  });
}

export function Group(type, ...elements) {
  let group = {
    groupType: type,
    elements: elements,
  };
  return group;
}

export function GroupElement(gameObject, number) {
  let element = {
    gameObject: gameObject,
    number: number,
  };
  return element;
}

//===================//
// Helper functions  //
//===================//

function CountThePlayerExistingBuildings(turnState, playerId) {
  let buildings = {
    CommandCenter: 0,
    SteelMine: 0,
    SolarPowerPlant: 0,
    CrystalMine: 0,
    Foundry: 0,
    CoreFactory: 0,
    Workshop: 0,
  };

  turnState.gameMap.forEach((element) => {
    if (element.building.owner === playerId) {
      switch (element.building.name) {
        case "Command Center":
          buildings.CommandCenter += 1;
          break;
        case "Steel Mine":
          buildings.SteelMine += 1;
          break;
        case "Solar Power Plant":
          buildings.SolarPowerPlant += 1;
          break;
        case "Crystal Mine":
          buildings.CrystalMine += 1;
          break;
        case "Foundry":
          buildings.Foundry += 1;
          break;
        case "Core Factory":
          buildings.CoreFactory += 1;
          break;
        case "Workshop":
          buildings.Workshop += 1;
          break;
        default:
          break;
      }
    }
  });

  return buildings;
}

function CheckTerrainForBuilding(terrain, building) {
  switch (building) {
    case "Steel Mine":
      if (terrain === "steel ore") {
        return true;
      } else {
        return false;
      }
    case "Crystal Mine":
      if (terrain === "crystal field") {
        return true;
      } else {
        return false;
      }
    default:
      break;
  }
  return true;
}

//TODO Refactor
function CheckResourcesForBuilding(resources, building) {
  switch (building) {
    case "Steel Mine":
      if (resources.steel >= 15) {
        return true;
      } else {
        return false;
      }
    case "Crystal Mine":
      if (resources.steel >= 15) {
        return true;
      } else {
        return false;
      }
    case "Solar Power Plant":
      if (resources.steel >= 10) {
        return true;
      } else {
        return false;
      }
    default:
      break;
  }
  return true;
}

export default Do;
