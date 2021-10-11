// Helper functions
function locationEqual(location1, location2) {
  if (location1[0] === location2[0] && location1[1] === location2[1]) {
    return true;
  }
  return false;
}

export function doAddBuilding(buildings, tiles, command) {
  buildings.push(command.building);
  tiles.find((tile) =>
    locationEqual(tile.location, command.location)
  ).buildingId = command.building.objectId;
}

export function doRemoveBuilding(buildings, tiles, command) {
  let buildingToRemove = buildings.find(
    (building) => building.objectId === command.building.objectId
  );
  let buildingIndex = buildings.indexOf(buildingToRemove);
  if (buildingIndex > -1) {
    buildings.splice(buildingIndex, 1);
  }
  tiles.find((tile) =>
    locationEqual(tile.location, command.location)
  ).buildingId = "null";
}

export function doAddUnit(units, tiles, command) {
  units.push(command.unit);
  tiles.find((tile) => locationEqual(tile.location, command.location)).unitId =
    command.unit.objectId;
}

export function doRemoveUnit(units, tiles, command) {
  let unitToRemove = units.find(
    (unit) => unit.objectId === command.unit.objectId
  );
  let unitIndex = units.indexOf(unitToRemove);
  if (unitIndex > -1) {
    units.splice(unitIndex, 1);
  }
  tiles.find((tile) => locationEqual(tile.location, command.location)).unitId =
    "null";
}

export function doMoveUnit(units, tiles, command) {
  let unitToMove = units.find(
    (unit) => unit.objectId === command.unit.objectId
  );
  unitToMove.location = command.endLocation;
  tiles.find((tile) =>
    locationEqual(tile.location, command.startLocation)
  ).unitId = "null";
  tiles.find((tile) =>
    locationEqual(tile.location, command.endLocation)
  ).unitId = command.unit.objectId;
}

export function doDamageObject(buildings, units, command) {
  if (command.object.type === "Building") {
    let buildingToDamage = buildings.find(
      (building) => building.objectId === command.object.objectId
    );
    buildingToDamage.hitPoints -= command.damage;
  }
  if (command.object.type === "Unit") {
    let unitToDamage = units.find(
      (unit) => unit.objectId === command.object.objectId
    );
    unitToDamage.hitPoints -= command.damage;
  }
}

export function doModifyResource(players, command) {
  let player = players.find((player) => player.playerName === command.playerId);
  player.resources[command.resource] += command.value;
}

export function doUpgrade(players, command) {
  let player = players.find((player) => player.playerName === command.playerId);
  let upgrade = "";
  switch (command.statType) {
    case "Armor":
      upgrade = "armor";
      break;
    case "Attack":
      upgrade = "attack";
      break;
    case "Hit Points":
      upgrade = "hitPoints";
      break;
    case "Speed":
      upgrade = "speed";
      break;
    default:
      break;
  }
  switch (command.unitType) {
    case "Artillery Bot":
      player.upgradeList.artilleryBotUpgrades[upgrade] = true;
      break;
    case "Attack Bot":
      player.upgradeList.attackBotUpgrades[upgrade] = true;
      break;
    case "Raider Bot":
      player.upgradeList.raiderBotUpgrades[upgrade] = true;
      break;
    case "Tank Bot":
      player.upgradeList.tankBotUpgrades[upgrade] = true;
      break;
    default:
      break;
  }
}

// Undo functions

export function undoAddBuilding(buildings, tiles, command) {
  let buildingToRemove = buildings.find(
    (building) => building.objectId === command.building.objectId
  );
  let buildingIndex = buildings.indexOf(buildingToRemove);
  if (buildingIndex > -1) {
    buildings.splice(buildingIndex, 1);
  }
  tiles.find((tile) =>
    locationEqual(tile.location, command.location)
  ).buildingId = "null";
}

export function undoRemoveBuilding(buildings, tiles, command) {
  buildings.push(command.building);
  tiles.find((tile) =>
    locationEqual(tile.location, command.location)
  ).buildingId = command.building.objectId;
}

export function undoAddUnit(units, tiles, command) {
  let unitToRemove = units.find(
    (unit) => unit.objectId === command.unit.objectId
  );
  let unitIndex = units.indexOf(unitToRemove);
  if (unitIndex > -1) {
    units.splice(unitIndex, 1);
  }
  tiles.find((tile) => locationEqual(tile.location, command.location)).unitId =
    "null";
}

export function undoRemoveUnit(units, tiles, command) {
  units.push(command.unit);
  tiles.find((tile) => locationEqual(tile.location, command.location)).unitId =
    command.unit.objectId;
}

export function undoMoveUnit(units, tiles, command) {
  let unitToMove = units.find(
    (unit) => unit.objectId === command.unit.objectId
  );
  unitToMove.location = command.startLocation;
  tiles.find((tile) =>
    locationEqual(tile.location, command.startLocation)
  ).unitId = command.unit.objectId;
  tiles.find((tile) =>
    locationEqual(tile.location, command.endLocation)
  ).unitId = "null";
}

export function undoDamageObject(buildings, units, command) {
  if (command.object.type === "Building") {
    let buildingToDamage = buildings.find(
      (building) => building.objectId === command.object.objectId
    );
    buildingToDamage.hitPoints += command.damage;
  }
  if (command.object.type === "Unit") {
    let unitToDamage = units.find(
      (unit) => unit.objectId === command.object.objectId
    );
    unitToDamage.hitPoints += command.damage;
  }
}

export function undoModifyResource(players, command) {
  let player = players.find((player) => player.playerName === command.playerId);
  player.resources[command.resource] -= command.value;
}

export function undoUpgrade(players, command) {
  let player = players.find((player) => player.playerName === command.playerId);
  let upgrade = "";
  switch (command.statType) {
    case "Armor":
      upgrade = "armor";
      break;
    case "Attack":
      upgrade = "attack";
      break;
    case "Hit Points":
      upgrade = "hitPoints";
      break;
    case "Speed":
      upgrade = "speed";
      break;
    default:
      break;
  }
  switch (command.unitType) {
    case "Artillery Bot":
      player.upgradeList.artilleryBotUpgrades[upgrade] = false;
      break;
    case "Attack Bot":
      player.upgradeList.attackBotUpgrades[upgrade] = false;
      break;
    case "Raider Bot":
      player.upgradeList.raiderBotUpgrades[upgrade] = false;
      break;
    case "Tank Bot":
      player.upgradeList.tankBotUpgrades[upgrade] = false;
      break;
    default:
      break;
  }
}
