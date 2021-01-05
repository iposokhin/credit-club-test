import { fxGetData } from "../common";
import { $participants } from "./index";

$participants.on(fxGetData.doneData, (state, { participants }) => {
  if (state.length > 0) {
    $participants.off(fxGetData.doneData);
  }

  return participants;
});
