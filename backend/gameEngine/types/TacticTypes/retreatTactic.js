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
import Tactic from "./tactic.js";
var RetreatTactic = /** @class */ (function (_super) {
    __extends(RetreatTactic, _super);
    function RetreatTactic(tacticType, groupRetreatAllowed, groupRetreatValue, individualRetreatAllowed, individualRetreatPercentage) {
        var _this = _super.call(this, tacticType) || this;
        _this.groupRetreatAllowed = groupRetreatAllowed;
        _this.groupRetreatValue = groupRetreatValue;
        _this.individualRetreatAllowed = individualRetreatAllowed;
        _this.individualRetreatPercentage = individualRetreatPercentage;
        return _this;
    }
    RetreatTactic.prototype.GetGroupRetreatAllowed = function () {
        return this.groupRetreatAllowed;
    };
    RetreatTactic.prototype.GetGroupRetreatValue = function () {
        return this.groupRetreatValue;
    };
    RetreatTactic.prototype.GetIndividualRetreatAllowed = function () {
        return this.individualRetreatAllowed;
    };
    RetreatTactic.prototype.GetIndividualRetreatPercentage = function () {
        return this.individualRetreatPercentage;
    };
    return RetreatTactic;
}(Tactic));
export default RetreatTactic;
