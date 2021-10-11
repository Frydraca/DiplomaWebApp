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
var MoveUnitCommand = /** @class */ (function (_super) {
    __extends(MoveUnitCommand, _super);
    function MoveUnitCommand(unitToMove, startLocation, endLocation) {
        var _this = _super.call(this, CommandType.MoveUnit) || this;
        _this.unitToMove = unitToMove;
        _this.startLocation = startLocation;
        _this.endLocation = endLocation;
        return _this;
    }
    MoveUnitCommand.prototype.Execute = function (game) {
        var result = game.MoveUnit(this.unitToMove, this.endLocation);
        return result;
    };
    // TODO ret type
    MoveUnitCommand.prototype.GetResult = function () {
        var ret = {
            type: CommandType.MoveUnit,
            unit: JSON.parse(JSON.stringify(this.unitToMove)),
            startLocation: JSON.parse(JSON.stringify(this.startLocation)),
            endLocation: JSON.parse(JSON.stringify(this.endLocation))
        };
        return new CommandResult(ret);
    };
    return MoveUnitCommand;
}(Command));
export default MoveUnitCommand;
