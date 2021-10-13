import Blockly from "node-blockly/browser";

export const defendTask = {
  name: "Defend Task",
  category: "Unit Tasks",
  block: {
    init: function () {
      this.jsonInit({
        type: "defendtask",
        message0: "Defend",
        output: "UnitTask",
        colour: 60,
        tooltip: "Defend unit task. Use as type input.\n" + "Output: UnitTask",
        helpUrl: "",
      });
    },
  },
  generator: (block) => {
    // TODO: Assemble JavaScript into code variable.
    var code = "'Defend'";
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.JavaScript.ORDER_NONE];
  },
};

export default defendTask;
