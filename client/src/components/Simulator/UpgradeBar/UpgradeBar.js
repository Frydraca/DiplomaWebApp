import React from "react";
import SecurityIcon from "@material-ui/icons/Security";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MyLocationIcon from "@material-ui/icons/MyLocation";
import PetsIcon from "@material-ui/icons/Pets";

function UpgradeBar(props) {
  let players = props.players;
  return (
    <div className="UpgradeBar">
      <div className="UpgradePlayer">{players[0].playerId}</div>
      <div className="UpgradeBarLine"></div>
      <ul className="UpgradeBarList">
        {Object.entries(players[0].upgradeList).map((value, key) => {
          return (
            <li key={key}>
              <div className="UpgradeStatus">
                <div className="UpgradeUnit">{value[0]}</div>
                <div className="Upgrades">
                  <div id="attack">
                    {value[1].attack ? <MyLocationIcon /> : <></>}
                  </div>
                  <div id="armor">
                    {value[1].armor ? <SecurityIcon /> : <></>}
                  </div>
                  <div id="hp">
                    {value[1].hitPoints ? <FavoriteIcon /> : <></>}
                  </div>
                  <div id="speed">{value[1].speed ? <PetsIcon /> : <></>}</div>
                </div>
                <div className="UpgradeBarLine"></div>
              </div>
            </li>
          );
        })}
        <div className="UpgradeBarLineThick"></div>
        <div className="UpgradePlayer">{players[1].playerId}</div>
        <div className="UpgradeBarLine"></div>
        {Object.entries(players[1].upgradeList).map((value, key) => {
          return (
            <li key={key}>
              <div className="UpgradeStatus">
                <div className="UpgradeUnit">{value[0]}</div>
                <div className="Upgrades">
                  <div id="attack">
                    {value[1].attack ? <MyLocationIcon /> : <></>}
                  </div>
                  <div id="armor">
                    {value[1].armor ? <SecurityIcon /> : <></>}
                  </div>
                  <div id="hp">
                    {value[1].hitPoints ? <FavoriteIcon /> : <></>}
                  </div>
                  <div id="speed">{value[1].speed ? <PetsIcon /> : <></>}</div>
                </div>
                <div className="UpgradeBarLine"></div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default UpgradeBar;
