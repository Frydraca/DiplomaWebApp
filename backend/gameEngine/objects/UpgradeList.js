module.exports = class UpgradeList {
  attackBot = {
    attack: false,
    armor: false,
    hitPoints: false,
    speed: false,
  };
  tankBot = {
    attack: false,
    armor: false,
    hitPoints: false,
    speed: false,
  };
  artilleryBot = {
    attack: false,
    armor: false,
    hitPoints: false,
    speed: false,
  };
  raiderBot = {
    attack: false,
    armor: false,
    hitPoints: false,
    speed: false,
  };

  GetUpgradesForType(unitType) {
    switch (unitType) {
      case "attackBot":
        return this.GetAttackBotUpgrades();
      case "tankBot":
        return this.GetTankBotUpgrades();
      case "artilleryBot":
        return this.GetArtilleryBotUpgrades();
      case "raiderBot":
        return this.GetRaiderBotUpgrades();
      default:
        console.log(
          "Error! Unrecognized upgrade type was requested. Type: " + unitType
        );
        return;
    }
  }

  SetUpgrade(unitType, upgradeType) {
    switch (unitType) {
      case "attackBot":
        this.attackBot[upgradeType] = true;
        break;
      case "tankBot":
        this.attackBot[upgradeType] = true;
        break;
      case "artilleryBot":
        this.attackBot[upgradeType] = true;
        break;
      case "raiderBot":
        this.attackBot[upgradeType] = true;
        break;
      default:
        console.log(
          "Error! Unrecognized upgrade type was requested. Type: " + unitType
        );
        return;
    }
  }

  GetAttackBotUpgrades() {
    return this.attackBot;
  }

  GetTankBotUpgrades() {
    return this.tankBot;
  }

  GetArtilleryBotUpgrades() {
    return this.artilleryBot;
  }

  GetRaiderBotUpgrades() {
    return this.raiderBot;
  }

  SetAttackBotUpgrades(attackBot) {
    this.attackBot = attackBot;
  }

  SetTankBotUpgrades(tankBot) {
    this.tankBot = tankBot;
  }

  SetArtilleryBotUpgrades(artilleryBot) {
    this.artilleryBot = artilleryBot;
  }

  SetRaiderBotUpgrades(raiderBot) {
    this.raiderBot = raiderBot;
  }
};
