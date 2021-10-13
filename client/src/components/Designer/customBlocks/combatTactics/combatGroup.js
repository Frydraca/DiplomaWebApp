import Blockly from "node-blockly/browser";

export const combatGroup = {
  name: "Combat Unit",
  category: "Combat Tactics",
  block: {
    init: function () {
      this.jsonInit({
        type: "combatgroup",
        message0: "Combat Group %1 Units %2 Task %3 Combat Behaviour %4",
        args0: [
          {
            type: "input_dummy",
          },
          {
            type: "input_value",
            name: "Units",
            check: "Group",
          },
          {
            type: "input_value",
            name: "Task",
            check: "UnitTask",
          },
          {
            type: "input_statement",
            name: "Combat Behaviour",
            check: "Tactic",
          },
        ],
        previousStatement: "CombatGroup",
        nextStatement: "CombatGroup",
        colour: 0,
        tooltip:
          "Define a combat group consisting of the provided units. The script will create the specified units and automatically assign them to the group. The group works together, their task is defined by the task input. Can apply more advanced tactics.\n" +
          "Mandatory Input: Group (with Unit option selected), UnitTask\n" +
          "Optional Input: Tactic\n" +
          "Previous Statement: CombatGroup\n" +
          "Next Statement: CombatGroup or nothing\n" +
          "Statement type: CombatGroup",
        helpUrl: "",
      });
    },
  },
  generator: (block) => {
    var value_units = Blockly.JavaScript.valueToCode(
      block,
      "Units",
      Blockly.JavaScript.ORDER_ATOMIC
    );
    var value_task = Blockly.JavaScript.valueToCode(
      block,
      "Task",
      Blockly.JavaScript.ORDER_ATOMIC
    );
    var statements_combat_behaviour = Blockly.JavaScript.statementToCode(
      block,
      "Combat Behaviour"
    );
    let groupId = Date.now() + Math.random();
    // TODO: Assemble JavaScript into code variable.
    var code =
      "this.CombatGroup(playerId," +
      groupId +
      "," +
      value_units +
      "," +
      value_task +
      statements_combat_behaviour +
      ")";
    return code;
  },
};

export default combatGroup;
