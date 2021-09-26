import React from "react";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import StopIcon from "@material-ui/icons/Stop";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import LastPageIcon from "@material-ui/icons/LastPage";

export const SidebarData = [
  {
    title: "Start New",
    icon: <PlayArrowIcon />,
    onClickFunction: "simulate",
  },
  {
    title: "Run",
    icon: <PlayArrowIcon />,
    onClickFunction: "run",
  },
  {
    title: "Stop",
    icon: <StopIcon />,
    onClickFunction: "stop",
  },
  {
    title: "Next",
    icon: <SkipNextIcon />,
    onClickFunction: "next",
  },
  {
    title: "Previous",
    icon: <SkipPreviousIcon />,
    onClickFunction: "previous",
  },
  {
    title: "Start",
    icon: <FirstPageIcon />,
    onClickFunction: "start",
  },
  {
    title: "End",
    icon: <LastPageIcon />,
    onClickFunction: "end",
  },
];
