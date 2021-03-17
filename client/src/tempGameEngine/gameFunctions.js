export function CheckForGameEnd(turnNumber) {
  if (turnNumber >= 10) return true;
  return false;
}

export function UpdateResources(turnState) {
  turnState.gameMap.forEach((element) => {
    switch (element.building.name) {
      case "Command Center":
        let playerResources = turnState.resources.find(
          (resource) => resource.playerId === element.building.owner
        );
        playerResources.energy += 10;
        break;
      // case "Steel Mine":
      //   let playerResources = turnState.resources.find(element => {element.playerId === element.building.owner });
      //   playerResources.energy -= 10;
      //   break;
      // case "Solar Power Plant":
      //   numberOfNeededBuildings = element.number - currentBuildings.SteelMine;
      //   break;
      // case "Crystal Mine":
      //   numberOfNeededBuildings = element.number - currentBuildings.SteelMine;
      //   break;
      // case "Foundry":
      //   numberOfNeededBuildings = element.number - currentBuildings.SteelMine;
      //   break;
      // case "Core Factory":
      //   numberOfNeededBuildings = element.number - currentBuildings.SteelMine;
      //   break;
      // case "Workshop":
      //   numberOfNeededBuildings = element.number - currentBuildings.SteelMine;
      //   break;
      default:
        break;
    }
  });
  return turnState;
}

export default UpdateResources;
