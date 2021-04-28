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
            value: 0,
            min: 0,
          },
          {
            type: "input_value",
            name: "UnitToCreate",
            check: ["Unit", "UnitGroup"],
          },
        ],
        previousStatement: null,
        nextStatement: null,
        colour: 290,
        tooltip: "",
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
    var code =
      "this.CreateNTimes(playerId, " +
      value_unittocreate +
      ", " +
      number_number +
      ");\n";
    return code;
  },
};

export default create;
