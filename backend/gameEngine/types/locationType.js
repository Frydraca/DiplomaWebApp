var LocationType = /** @class */ (function () {
    function LocationType(x, y) {
        this.x = x;
        this.y = y;
    }
    LocationType.prototype.GetX = function () {
        return this.x;
    };
    LocationType.prototype.GetY = function () {
        return this.y;
    };
    LocationType.prototype.GetLocation = function () {
        var location;
        location.push(this.x);
        location.push(this.y);
        return location;
    };
    LocationType.prototype.SameLocation = function (locationToCompare) {
        if (this.x === locationToCompare.GetX() &&
            this.y === locationToCompare.GetY())
            return true;
        else
            return false;
    };
    LocationType.prototype.DistanceFrom = function (locationToCompare) {
        return (Math.abs(this.x - locationToCompare.GetX()) +
            Math.abs(this.y - locationToCompare.GetY()));
    };
    return LocationType;
}());
export default LocationType;
