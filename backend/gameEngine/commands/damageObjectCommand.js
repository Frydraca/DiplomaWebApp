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
var DamageObjectCommand = /** @class */ (function (_super) {
    __extends(DamageObjectCommand, _super);
    function DamageObjectCommand(object, damage) {
        var _this = _super.call(this, CommandType.DamageObject) || this;
        _this.object = object;
        _this.damage = damage;
        return _this;
    }
    DamageObjectCommand.prototype.Execute = function (game) {
        var result = game.DamageObject(this.object, this.damage);
        return result;
    };
    // TODO ret type
    DamageObjectCommand.prototype.GetResult = function () {
        var ret = {
            type: CommandType.DamageObject,
            object: JSON.parse(JSON.stringify(this.object)),
            damage: JSON.parse(JSON.stringify(this.damage))
        };
        return new CommandResult(ret);
    };
    return DamageObjectCommand;
}(Command));
export default DamageObjectCommand;
