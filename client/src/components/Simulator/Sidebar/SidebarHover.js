import React from "react";
import SidebarHoverRow from "./SidebarHoverRow";
import SecurityIcon from "@material-ui/icons/Security";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MyLocationIcon from "@material-ui/icons/MyLocation";
import PetsIcon from "@material-ui/icons/Pets";

function SidebarHover(props) {
  const data = props.data;
  return (
    <div className="SidebarHover">
      <div className="UpgradePlayer">{data.owner}</div>
      <div className="UpgradePlayer">{data.objectName}</div>
      <div className="UpgradeBarLine"></div>
      <div className="UpgradeStatus">
        <li className="row">
          <SidebarHoverRow
            icon={<FavoriteIcon />}
            stat={"Hit Points"}
            data={data.stats.hp}
          ></SidebarHoverRow>
          <SidebarHoverRow
            icon={<FavoriteIcon />}
            stat={"Max Hit Points"}
            data={data.stats.maxHp}
          ></SidebarHoverRow>
          <SidebarHoverRow
            icon={<MyLocationIcon />}
            stat={"Attack"}
            data={data.stats.attack}
          ></SidebarHoverRow>
          <SidebarHoverRow
            icon={<SecurityIcon />}
            stat={"Armor"}
            data={data.stats.armor}
          ></SidebarHoverRow>
          <SidebarHoverRow
            icon={<MyLocationIcon />}
            stat={"Range"}
            data={data.stats.range}
          ></SidebarHoverRow>
          <SidebarHoverRow
            icon={<PetsIcon />}
            stat={"Speed"}
            data={data.stats.speed}
          ></SidebarHoverRow>
        </li>
      </div>
    </div>
  );
}

export default SidebarHover;
