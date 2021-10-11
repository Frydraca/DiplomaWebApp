var PathNode = /** @class */ (function () {
    function PathNode(tile, parent, f, g, h) {
        this.tile = tile;
        this.parent = parent;
        this.f = f;
        this.g = g;
        this.h = h;
    }
    PathNode.prototype.GetTile = function () {
        return this.tile;
    };
    PathNode.prototype.SetTile = function (tile) {
        this.tile = tile;
    };
    PathNode.prototype.GetParent = function () {
        return this.parent;
    };
    PathNode.prototype.SetParent = function (parent) {
        this.parent = parent;
    };
    PathNode.prototype.GetF = function () {
        return this.f;
    };
    PathNode.prototype.SetF = function (f) {
        this.f = f;
    };
    PathNode.prototype.GetG = function () {
        return this.g;
    };
    PathNode.prototype.SetG = function (g) {
        this.g = g;
    };
    PathNode.prototype.GetH = function () {
        return this.h;
    };
    PathNode.prototype.SetH = function (h) {
        this.h = h;
    };
    return PathNode;
}());
export default PathNode;
