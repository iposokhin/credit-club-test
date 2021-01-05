import { createEffect } from "effector";
import { createGate } from "effector-react";
import { getFakeData } from "../../api";

export const CommonGate = createGate();

export const fxGetData = createEffect({ handler: getFakeData });
