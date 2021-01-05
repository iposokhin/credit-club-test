import { forward } from "effector";
import { fxGetData, CommonGate } from "./index";

forward({
  from: CommonGate.open,
  to: fxGetData
});
