var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { CommandType } from "../enums/commandType.js";
import CommandResult from "../types/commandResult.js";
import Command from "./baseCommand.js";
var UpgradeCommand = /** @class */ (function (_super) {
    __extends(UpgradeCommand, _super);
    function UpgradeCommand(playerName, unitType, upgradeType) {
        var _this = _super.call(this, CommandType.Upgrade) || this;
        _this.playerName = playerName;
        _this.unitType = unitType;
        _this.upgradeType = upgradeType;
        return _this;
    }
    UpgradeCommand.prototype.Execute = function (game) {
        return game.UpgradeStat(this.playerName, this.unitType, this.upgradeType);
    };
    UpgradeCommand.prototype.GetPlayerName = function () {
        return this.playerName;
    };
    // TODO ret Type
    UpgradeCommand.prototype.GetResult = function () {
        var ret = {
            type: CommandType.Upgrade,
            playerId: JSON.parse(JSON.stringify(this.playerName)),
            unitType: JSON.parse(JSON.stringify(this.unitType)),
            statType: JSON.parse(JSON.stringify(this.upgradeType))
        };
        return new CommandResult(ret);
    };
    return UpgradeCommand;
}(Command));
export default UpgradeCommand;
