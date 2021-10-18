import Blockly from "node-blockly/browser";

export const guardTask = {
  name: "Guard Task",
  category: "Unit Tasks",
  block: {
    init: function () {
      this.jsonInit({
        type: "guardtask",
        message0: "Guard %1",
        args0: [
          {
            type: "input_value",
            name: "Target",
            check: "Building",
          },
        ],
        output: "UnitTask",
        colour: 60,
        /* eslint-disable no-useless-concat */
        tooltip: "Guard unit task. Use as type input.\n" + "Output: UnitTask",
        /* eslint-enable no-useless-concat */
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
    var code = "'Guard'";
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.JavaScript.ORDER_NONE];
  },
};

export default guardTask;
