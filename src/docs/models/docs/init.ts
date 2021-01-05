import { forward, restore, combine, sample, guard } from "effector";
import { fxGetData } from "../common";
import { $filtersFns, $normalizedDocs, fxDocsFormat, $openedId } from "./index";

const $receivedDocs = restore(
  fxGetData.doneData.map(({ documents }) => documents),
  []
);

const openedNoExistMore = guard({
  source: sample({
    source: $openedId,
    clock: $normalizedDocs,
    fn: (openedId, docs) => !!openedId && !docs[openedId],
  }),
  filter: Boolean,
});

$normalizedDocs.on(fxDocsFormat.doneData, (_, data) => data);

$openedId.reset(openedNoExistMore);

forward({
  from: combine({
    documents: $receivedDocs,
    filters: $filtersFns,
  }),
  to: fxDocsFormat,
});
