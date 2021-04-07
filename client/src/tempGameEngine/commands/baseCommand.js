export default class Command {
  type = "";
  constructor(type) {
    this.type = type;
  }

  GetType() {
    return this.type;
  }
}
