export const enemyAttacked = {
  name: "Enemy Attacked",
  category: "Triggers",
  block: {
    init: function () {
      this.jsonInit({
        type: "trigger_enemy_attacked",
        message0: "Enemy attacked",
        previousStatement: "Trigger",
        nextStatement: "Trigger",
        colour: 230,
        tooltip:
          "Returns true, if the player was atatcked last turn.\n" +
          "Previous Statement: Trigger\n" +
          "Next Statement: Trigger or nothing\n" +
          "Statement type: Trigger",
        helpUrl: "",
      });
    },
  },
  generator: (block) => {
    var code = "this.PlayerWasAttacked(playerId)";
    return code;
  },
};

export default enemyAttacked;
