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
var FocusFireTactic = /** @class */ (function (_super) {
    __extends(FocusFireTactic, _super);
    function FocusFireTactic(tacticType, focusFireEnabled, focusFireTarget, focusOnlyUnits) {
        var _this = _super.call(this, tacticType) || this;
        _this.focusFireEnabled = focusFireEnabled;
        _this.focusFireTarget = focusFireTarget;
        _this.focusOnlyUnits = focusOnlyUnits;
        return _this;
    }
    FocusFireTactic.prototype.GetFocusFireEnabled = function () {
        return this.focusFireEnabled;
    };
    FocusFireTactic.prototype.GetFocusFireTarget = function () {
        return this.focusFireTarget;
    };
    FocusFireTactic.prototype.GetFocusOnlyUnits = function () {
        return this.focusOnlyUnits;
    };
    return FocusFireTactic;
}(Tactic));
export default FocusFireTactic;
