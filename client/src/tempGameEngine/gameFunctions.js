export function CheckForGameEnd(turnNumber) {
  if (turnNumber >= 10) return true;
  return false;
}

export function UpdateResources(turnState) {
  turnState.gameMap.forEach((element) => {
    if (element.building !== {} && element.building.name === "Command Center") {
      turnState.energy += 10;
    }
  });
  return turnState;
}

export default UpdateResources;
