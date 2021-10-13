import Blockly from "node-blockly/browser";

export const raidTask = {
  name: "Raid Task",
  category: "Unit Tasks",
  block: {
    init: function () {
      this.jsonInit({
        type: "raidtask",
        message0: "Raid %1",
        args0: [
          {
            type: "input_value",
            name: "Target",
            check: "Building",
          },
        ],
        output: "UnitTask",
        colour: 60,
        tooltip: "Raid unit task. Use as type input.\n" + "Output: UnitTask",
        helpUrl: "",
      });
    },
  },
  generator: (block) => {
    var value_target = Blockly.JavaScript.valueToCode(
      block,
      "Target",
      Blockly.JavaScript.ORDER_ATOMIC
    );
    // TODO: Assemble JavaScript into code variable.
    var code = "'Raid'";
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.JavaScript.ORDER_NONE];
  },
};

export default raidTask;
