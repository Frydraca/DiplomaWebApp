export const enemyAttacked = {
  name: "Enemy Attacked",
  category: "Triggers",
  block: {
    init: function () {
      this.jsonInit({
        type: "trigger_enemy_attacked",
        message0: "Enemy attacked",
        previousStatement: ["Structure", "Trigger"],
        nextStatement: "Trigger",
        colour: 230,
        tooltip: "",
        helpUrl: "",
      });
    },
  },
  generator: (block) => {
    // TODO: Assemble JavaScript into code variable.
    var code = "EnemyAttacked()";
    return code;
  },
};

export default enemyAttacked;
