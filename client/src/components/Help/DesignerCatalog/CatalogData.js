import React from "react";
import HomeIcon from "@material-ui/icons/Home";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";
import AccessAlarmsIcon from "@material-ui/icons/AccessAlarms";
import CategoryIcon from "@material-ui/icons/Category";
import CallSplitIcon from "@material-ui/icons/CallSplit";
import BuildIcon from "@material-ui/icons/Build";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";

export const CatalogData = [
  {
    title: "Home",
    icon: <HomeIcon />,
    onClickFunction: "TODO",
  },
  {
    title: "Structures",
    icon: <AccountTreeIcon />,
  },
  {
    title: "Actions",
    icon: <DoubleArrowIcon />,
  },
  {
    title: "Triggers",
    icon: <AccessAlarmsIcon />,
  },
  {
    title: "Types",
    icon: <CategoryIcon />,
  },
  {
    title: "Combat Tactics",
    icon: <CallSplitIcon />,
  },
  {
    title: "Unit Tasks",
    icon: <BuildIcon />,
  },
  {
    title: "Research",
    icon: <ImportContactsIcon />,
  },
  {
    title: "Trading",
    icon: <AttachMoneyIcon />,
  },
];
