var Command = /** @class */ (function () {
    function Command(type) {
        this.type = type;
    }
    Command.prototype.GetType = function () {
        return this.type;
    };
    return Command;
}());
export default Command;
