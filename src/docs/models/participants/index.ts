import { createStore } from "effector";
import { DocumentParticipant } from "../../api";

export const $participants = createStore<DocumentParticipant[]>([]);
