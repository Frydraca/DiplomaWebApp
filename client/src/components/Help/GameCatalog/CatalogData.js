import React from "react";
import HomeIcon from "@material-ui/icons/Home";
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import CategoryIcon from "@material-ui/icons/Category";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";

export const CatalogData = [
  {
    title: "Home",
    icon: <HomeIcon />,
    link: "/gameRules",
  },
  {
    title: "Resources",
    icon: <CategoryIcon />,
    link: "/gameRules/resources",
  },
  {
    title: "Buildings",
    icon: <LocationCityIcon />,
    link: "/gameRules/buildings",
  },
  {
    title: "Units",
    icon: <DoubleArrowIcon />,
    link: "/gameRules/units",
  },
  {
    title: "Upgrades",
    icon: <ImportContactsIcon />,
    link: "/gameRules/upgrades",
  },
];
