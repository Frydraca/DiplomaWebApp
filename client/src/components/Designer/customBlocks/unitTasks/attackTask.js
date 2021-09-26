import Blockly from "node-blockly/browser";

export const attackTask = {
  name: "Attack Task",
  category: "Unit Tasks",
  block: {
    init: function () {
      this.jsonInit({
        type: "attacktask",
        message0: "Attack",
        output: "Task",
        colour: 60,
        tooltip: "",
        helpUrl: "",
      });
    },
  },
  generator: (block) => {
    // TODO: Assemble JavaScript into code variable.
    var code = "'attack'";
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.JavaScript.ORDER_NONE];
  },
};

export default attackTask;
