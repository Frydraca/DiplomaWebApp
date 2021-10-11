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
var AddBuildingCommand = /** @class */ (function (_super) {
    __extends(AddBuildingCommand, _super);
    function AddBuildingCommand(building, location) {
        var _this = _super.call(this, CommandType.AddBuilding) || this;
        _this.building = building;
        _this.location = location;
        return _this;
    }
    AddBuildingCommand.prototype.Execute = function (game) {
        var result = game.AddBuilding(this.building, this.location);
        return result;
    };
    AddBuildingCommand.prototype.GetBuilding = function () {
        return this.building;
    };
    // TODO ret type
    AddBuildingCommand.prototype.GetResult = function () {
        var ret = {
            type: CommandType.AddBuilding,
            building: JSON.parse(JSON.stringify(this.building)),
            location: JSON.parse(JSON.stringify(this.location))
        };
        return new CommandResult(ret);
    };
    return AddBuildingCommand;
}(Command));
export default AddBuildingCommand;
