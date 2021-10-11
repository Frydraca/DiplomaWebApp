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
var ModifyResourceCommand = /** @class */ (function (_super) {
    __extends(ModifyResourceCommand, _super);
    function ModifyResourceCommand(playerName, resource, value) {
        var _this = _super.call(this, CommandType.ModifyResource) || this;
        _this.playerName = playerName;
        _this.resource = resource;
        _this.value = value;
        return _this;
    }
    ModifyResourceCommand.prototype.Execute = function (game) {
        return game.ModifyResource(this.playerName, this.resource, this.value);
    };
    ModifyResourceCommand.prototype.GetPlayerName = function () {
        return this.playerName;
    };
    ModifyResourceCommand.prototype.GetResource = function () {
        return this.resource;
    };
    ModifyResourceCommand.prototype.GetValue = function () {
        return this.value;
    };
    //TODO ret type
    ModifyResourceCommand.prototype.GetResult = function () {
        var ret = {
            type: CommandType.ModifyResource,
            playerId: JSON.parse(JSON.stringify(this.playerName)),
            resource: JSON.parse(JSON.stringify(this.resource)),
            value: JSON.parse(JSON.stringify(this.value))
        };
        return new CommandResult(ret);
    };
    return ModifyResourceCommand;
}(Command));
export default ModifyResourceCommand;
