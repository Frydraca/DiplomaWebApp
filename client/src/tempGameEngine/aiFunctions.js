export function Do(action) {
  return action;
}

function Build(item) {
  //TODO
}

export function BuildUpTo(turnState, buildingGroup) {
  if (buildingGroup.groupType !== "Building") {
    console.log("error");
    return "error";
  }

  var currentBuildings = CountThePlayerExistingBuildings(turnState, "player1");

  console.log(currentBuildings);

  turnState.gameMap.forEach((element) => {
    if (element.building.name === "null") {
      element.building = { owner: "player1", name: "Steel Mine" };
    }
  });

  // buildingGroup.elements.forEach();
}

export function Group(type, elements) {
  var group = {
    groupType: type,
    elements: elements,
  };
  return group;
}

export function GroupElement(gameObject, number) {
  var element = {
    gameObject: gameObject,
    number: number,
  };
  return element;
}

//===================//
// Helper functions  //
//===================//

function CountThePlayerExistingBuildings(turnState, playerId) {
  var buildings = {
    CommandCenter: 0,
    SteelMine: 0,
    SolarPowerPlant: 0,
  };

  turnState.gameMap.forEach((element) => {
    switch (element.building.name) {
      case "Command Center":
        if (element.building.owner === playerId) {
          buildings.CommandCenter += 1;
        }
        break;
      case "Steel Mine":
        if (element.building.owner === playerId) {
          buildings.SteelMine += 1;
        }
        break;
      case "SolarPowerPlant":
        if (element.building.owner === playerId) {
          buildings.SolarPowerPlant += 1;
        }
        break;
      default:
        break;
    }
  });

  return buildings;
}

export default Do;
