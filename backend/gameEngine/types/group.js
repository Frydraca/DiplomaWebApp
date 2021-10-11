var Group = /** @class */ (function () {
    function Group(objectType, groupElements) {
        this.groupType = objectType;
        this.groupElements = groupElements;
    }
    Group.prototype.GetGroupType = function () {
        return this.groupType;
    };
    Group.prototype.GetGroupElements = function () {
        return this.groupElements;
    };
    return Group;
}());
export default Group;
