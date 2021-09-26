import artilleryBot_Red from "./images/units/artillery_red.png";
import artilleryBot_Green from "./images/units/artillery_green.png";
import attackBot_Red from "./images/units/attack_red.png";
import attackBot_Green from "./images/units/attack_green.png";
import raiderBot_Red from "./images/units/raider_red.png";
import raiderBot_Green from "./images/units/raider_green.png";
import tankBot_Red from "./images/units/tank_red.png";
import tankBot_Green from "./images/units/tank_green.png";

const Units = {
  Player: {
    "Artillery Bot": artilleryBot_Red,
    "Attack Bot": attackBot_Red,
    "Raider Bot": raiderBot_Red,
    "Tank Bot": tankBot_Red,
  },
  "Server AI": {
    "Artillery Bot": artilleryBot_Green,
    "Attack Bot": attackBot_Green,
    "Raider Bot": raiderBot_Green,
    "Tank Bot": tankBot_Green,
  },
};

export default Units;
