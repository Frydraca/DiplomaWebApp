var GameObject = /** @class */ (function () {
    function GameObject(objectData, owner) {
        this.objectId = Date.now() + Math.random();
        this.owner = JSON.parse(JSON.stringify(owner));
        this.name = objectData.GetObjectName();
        this.type = objectData.GetType();
        this.location = objectData.GetLocation();
        this.cost = objectData.GetCost();
        this.hitPoints = objectData.GetHitPoints();
        this.maxHitPoints = objectData.GetHitPoints();
        this.armor = objectData.GetArmor();
        this.canAttack = objectData.GetCanAttack();
        this.range = objectData.GetRange();
        this.attackDamage = objectData.GetAttackDamage();
    }
    GameObject.prototype.GetObjectId = function () {
        return this.objectId;
    };
    GameObject.prototype.SetObjectId = function (id) {
        this.objectId = id;
    };
    GameObject.prototype.GetType = function () {
        return this.type;
    };
    GameObject.prototype.GetOwner = function () {
        return this.owner;
    };
    GameObject.prototype.GetName = function () {
        return this.name;
    };
    GameObject.prototype.GetLocation = function () {
        return this.location;
    };
    GameObject.prototype.SetLocation = function (location) {
        this.location = location;
    };
    GameObject.prototype.GetHitPoints = function () {
        return this.hitPoints;
    };
    GameObject.prototype.GetCanAttack = function () {
        return this.canAttack;
    };
    GameObject.prototype.GetRange = function () {
        return this.range;
    };
    GameObject.prototype.GetAttackDamage = function () {
        return this.attackDamage;
    };
    GameObject.prototype.TakeDamage = function (incomingDamage) {
        var damageTaken = Math.max(incomingDamage - this.armor, 1);
        this.hitPoints -= damageTaken;
        return damageTaken;
    };
    GameObject.prototype.GetDistanceFromObject = function (gameObject) {
        return (Math.abs(gameObject.GetLocation().GetX() - this.location.GetX()) +
            Math.abs(gameObject.GetLocation().GetY() - this.location.GetY()));
    };
    GameObject.prototype.InRange = function (gameObject) {
        if (this.range >= this.GetDistanceFromObject(gameObject)) {
            return true;
        }
        return false;
    };
    GameObject.prototype.UpgradeArmor = function (value) {
        this.armor += value;
    };
    GameObject.prototype.UpgradeAttackDamage = function (value) {
        this.attackDamage += value;
    };
    GameObject.prototype.UpgradeHitPoints = function (value) {
        this.hitPoints += value;
    };
    return GameObject;
}());
export default GameObject;
