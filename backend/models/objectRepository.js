const User = require("./User");
const Script = require("./Script");
const GameMap = require("./GameMap");
const Game = require("./Game");
const Cell = require("./Cell");
const Building = require("./Building");
const Unit = require("./Unit");
const Player = require("./Player");

const objRepo = {
  User: User,
  Script: Script,
  GameMap: GameMap,
  Game: Game,
  Cell: Cell,
  Building: Building,
  Unit: Unit,
  Player: Player,
};

module.exports = objRepo;
