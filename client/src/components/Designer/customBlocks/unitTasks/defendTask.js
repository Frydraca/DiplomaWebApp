import Blockly from "node-blockly/browser";

export const defendTask = {
  name: "Defend Task",
  category: "Unit Tasks",
  block: {
    init: function () {
      this.jsonInit({
        type: "defendtask",
        message0: "Defend",
        output: "Task",
        colour: 60,
        tooltip: "",
        helpUrl: "",
      });
    },
  },
  generator: (block) => {
    // TODO: Assemble JavaScript into code variable.
    var code = "...";
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.JavaScript.ORDER_NONE];
  },
};

export default defendTask;
