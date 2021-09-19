import React from "react";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import LastPageIcon from "@material-ui/icons/LastPage";

export const SidebarData = [
  {
    title: "Run",
    icon: <PlayArrowIcon />,
    onClickFunction: "TODO",
  },
  {
    title: "Next",
    icon: <SkipNextIcon />,
  },
  {
    title: "Previous",
    icon: <SkipPreviousIcon />,
  },
  {
    title: "Start",
    icon: <FirstPageIcon />,
  },
  {
    title: "End",
    icon: <LastPageIcon />,
  },
];
