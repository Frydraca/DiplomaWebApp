var ExpectedUnit = /** @class */ (function () {
    function ExpectedUnit(unitType, inGroup, unitId) {
        this.unitType = unitType;
        this.inGroup = inGroup;
        this.unitId = unitId;
    }
    ExpectedUnit.prototype.GetUnitType = function () {
        return this.unitType;
    };
    ExpectedUnit.prototype.IsInGroup = function () {
        return this.inGroup;
    };
    ExpectedUnit.prototype.SetInGroup = function (state) {
        this.inGroup = state;
    };
    ExpectedUnit.prototype.GetUnitId = function () {
        return this.unitId;
    };
    ExpectedUnit.prototype.SetUnitId = function (id) {
        this.unitId = id;
    };
    return ExpectedUnit;
}());
export default ExpectedUnit;
