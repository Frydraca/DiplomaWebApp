import Blockly from "node-blockly/browser";

export const create = {
  name: "Create",
  category: "Actions",
  block: {
    init: function () {
      this.jsonInit({
        type: "action_create",
        message0: "Create %1 %2",
        args0: [
          {
            type: "field_number",
            name: "Number",
            value: 1,
            min: 1,
          },
          {
            type: "input_value",
            name: "UnitToCreate",
            check: "Unit",
          },
        ],
        previousStatement: "Action",
        nextStatement: "Action",
        colour: 290,
        tooltip:
          "Action to create a unit the given times. The quantity value must be positive.\n" +
          "Mandatory Input: Unit\n" +
          "Previous Statement: Action\n" +
          "Next Statement: Action or nothing\n" +
          "Statement type: Action",
        helpUrl: "",
      });
    },
  },
  generator: (block) => {
    var value_unittocreate = Blockly.JavaScript.valueToCode(
      block,
      "UnitToCreate",
      Blockly.JavaScript.ORDER_ATOMIC
    );
    var number_number = block.getFieldValue("Number");
    // TODO: Assemble JavaScript into code variable.
    value_unittocreate = value_unittocreate.substring(1);
    value_unittocreate = value_unittocreate.substring(
      0,
      value_unittocreate.length - 1
    );
    var code =
      "this.CreateNTimes(playerId, " +
      value_unittocreate +
      ", " +
      number_number +
      ")";
    return code;
  },
};

export default create;
