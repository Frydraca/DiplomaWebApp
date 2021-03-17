export function Do(action) {
  return action;
}

function Build(turnState, building, number) {
  let buildCount = 0;
  turnState.gameMap.forEach((element) => {
    if (
      element.building.name === "null" &&
      buildCount < number &&
      CheckTerrainForBuilding(element.terrain, building)
    ) {
      element.building = { owner: "player1", name: building };
      buildCount += 1;
    }
  });
}

export function BuildUpTo(turnState, buildingGroup) {
  if (buildingGroup.groupType !== "Building") {
    console.log("Error: wrong type! Type: " + buildingGroup.groupType);
  }

  let currentBuildings = CountThePlayerExistingBuildings(turnState, "player1");

  buildingGroup.elements.forEach((element) => {
    let numberOfNeededBuildings = 0;
    switch (element.gameObject) {
      case "Command Center":
        console.log("Error: Cant build new command centers!");
        break;
      case "Steel Mine":
        numberOfNeededBuildings = element.number - currentBuildings.SteelMine;
        break;
      case "Solar Power Plant":
        numberOfNeededBuildings = element.number - currentBuildings.SteelMine;
        break;
      case "Crystal Mine":
        numberOfNeededBuildings = element.number - currentBuildings.SteelMine;
        break;
      case "Foundry":
        numberOfNeededBuildings = element.number - currentBuildings.SteelMine;
        break;
      case "Core Factory":
        numberOfNeededBuildings = element.number - currentBuildings.SteelMine;
        break;
      case "Workshop":
        numberOfNeededBuildings = element.number - currentBuildings.SteelMine;
        break;
      default:
        break;
    }
    if (numberOfNeededBuildings > 0) {
      Build(turnState, element.gameObject, numberOfNeededBuildings);
    }
  });

  console.log(currentBuildings);
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

export default Do;
