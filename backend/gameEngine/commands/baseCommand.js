module.exports = class Command {
  type = "";
  constructor(type) {
    this.type = type;
  }

  GetType() {
    return this.type;
  }

  GetResult() {
    return {
      type: "",
    };
  }
};
