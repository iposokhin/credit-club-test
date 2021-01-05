import { createEvent, createStore, createEffect, restore, combine } from "effector";
import { debounce } from "patronum/debounce";

import { Document, DocumentParticipant } from "../../api";

interface Normalized<T> {
  [id: string]: T;
}

type NormalizedDocuments = Normalized<Document>;
type FilterFn = (i: Document) => boolean;

interface FormatParams {
  documents: Document[];
  filters: FilterFn[];
}

function formatDocs(params: FormatParams): Promise<NormalizedDocuments> {
  const { documents, filters } = params;

  let promises: Promise<NormalizedDocuments>[] = [];
  const sliceSize = 150;

  for (let i = 0; i < documents.length; i += sliceSize) {
    const promise: Promise<NormalizedDocuments> = new Promise((res) => {
      const slice = documents.slice(i, i + sliceSize);

      res(slice.filter((i) => filters.every((fn) => fn(i))).reduce((acc, i) => ({ ...acc, [i.id]: i }), {}));
    });

    promises.push(promise);
  }

  return Promise.all(promises).then((results) => results.reduce((acc, i) => ({ ...acc, ...i }), {}));
}

export const open = createEvent<string>();
export const changeCategory = createEvent<string>();
export const changeSearch = createEvent<string>();
export const changeParticipant = createEvent<string>();

export const fxDocsFormat = createEffect({ handler: formatDocs });

export const $normalizedDocs = createStore<NormalizedDocuments>({});
export const $openedId = restore(open, null);
export const $category = restore(changeCategory, "all");
export const $search = restore(changeSearch, "");
export const $participant = restore(changeParticipant, "");
const $defferedSearch = restore(debounce({ source: changeSearch, timeout: 300 }), "");
export const $documents = $normalizedDocs.map((data) => Object.values(data));

export const $opened = combine($normalizedDocs, $openedId, (data, id) => id && data[id]);

export const $filtersFns = combine($category, $defferedSearch, $participant, (category, search, participantId) => {
  let filters: FilterFn[] = [];
  const isSigned = (item: Document | DocumentParticipant) => item.signedDate !== null;
  const isDefined = (str: string): boolean => str !== "";

  if (category === "mine") {
    filters.push((doc) => !isSigned(doc));
  }

  if (isDefined(search)) {
    const hasSearchWordIn = (str: string): boolean => str.indexOf(search) > -1;
    const hasSearchWordInName = (p: DocumentParticipant): boolean =>
      hasSearchWordIn(p.firstname) || hasSearchWordIn(p.lastname);

    filters.push((doc) => hasSearchWordIn(doc.title) || doc.participants.some(hasSearchWordInName));
  }

  if (isDefined(participantId)) {
    filters.push((doc) => doc.participants.some((p) => p.id === participantId && isSigned(p)));
  }

  return filters;
});
