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
    link: "/designerhelp",
  },
  {
    title: "Structures",
    icon: <AccountTreeIcon />,
    link: "/designerhelp/structures",
  },
  {
    title: "Actions",
    icon: <DoubleArrowIcon />,
    link: "/designerhelp/actions",
  },
  {
    title: "Triggers",
    icon: <AccessAlarmsIcon />,
    link: "/designerhelp/triggers",
  },
  {
    title: "Types",
    icon: <CategoryIcon />,
    link: "/designerhelp/types",
  },
  {
    title: "Combat Tactics",
    icon: <CallSplitIcon />,
    link: "/designerhelp/combatTactics",
  },
  {
    title: "Unit Tasks",
    icon: <BuildIcon />,
    link: "/designerhelp/unitTasks",
  },
  {
    title: "Research",
    icon: <ImportContactsIcon />,
    link: "/designerhelp/research",
  },
  {
    title: "Trading",
    icon: <AttachMoneyIcon />,
    link: "/designerhelp/trading",
  },
];
