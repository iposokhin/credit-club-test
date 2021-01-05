import React from "react";

import {
  SvgIcon,
  makeStyles
} from "@material-ui/core";

import { green, red } from "@material-ui/core/colors";

import { mdiPen, mdiPenOff } from "@mdi/js";

export const useSignStyles = makeStyles((theme) => ({
  unsign: {
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: red[500]
  },
  sign: {
    color: theme.palette.getContrastText(green[500]),
    backgroundColor: green[500]
  }
}));

const PenIcon: React.FC = (props) => {
  return (
    <SvgIcon>
      <path d={mdiPen} />
    </SvgIcon>
  );
};

const PenOffIcon: React.FC = (props) => {
  return (
    <SvgIcon>
      <path d={mdiPenOff} />
    </SvgIcon>
  );
};

export const SignIcon: React.FC<{isSigned: boolean}> = (props) => {
  const {isSigned} = props;

  return isSigned ? <PenIcon /> : <PenOffIcon />;
}