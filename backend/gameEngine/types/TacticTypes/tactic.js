var Tactic = /** @class */ (function () {
    function Tactic(tacticType) {
        this.tacticType = tacticType;
    }
    Tactic.prototype.GetTacticType = function () {
        return this.tacticType;
    };
    return Tactic;
}());
export default Tactic;
