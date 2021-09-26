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
            check: "Task",
          },
          {
            type: "input_statement",
            name: "Combat Behaviour",
            check: "CombatBehaviour",
          },
        ],
        previousStatement: null,
        nextStatement: null,
        colour: 0,
        tooltip: "",
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
