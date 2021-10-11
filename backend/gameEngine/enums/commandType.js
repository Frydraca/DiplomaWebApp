export var CommandType;
(function (CommandType) {
    CommandType["AddBuilding"] = "Add Building";
    CommandType["RemoveBuilding"] = "Remove Building";
    CommandType["AddUnit"] = "Add Unit";
    CommandType["RemoveUnit"] = "Remove Unit";
    CommandType["MoveUnit"] = "Move Unit";
    CommandType["Upgrade"] = "Upgrade";
    CommandType["ModifyResource"] = "Modify Resource";
    CommandType["DamageObject"] = "Damage Object";
    CommandType["UpdateResource"] = "Update Resource";
})(CommandType || (CommandType = {}));
