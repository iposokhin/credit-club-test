import { name, random, date, lorem } from "faker";

const ELEMENTS_COUNT = 5000;

export interface Data {
  participants: DocumentParticipant[];
  documents: Document[];
}

export interface DocumentParticipant {
  id: string;
  firstname: string;
  lastname: string;
  signedDate: Date | null;
}

export interface Document {
  title: string;
  id: string;
  signedDate: Date | null;
  participants: DocumentParticipant[];
}

const participantFactory = (): Omit<DocumentParticipant, "signedDate"> => ({
  firstname: name.firstName(),
  lastname: name.lastName(),
  id: random.uuid(),
});

const elementFactory = (sourceParticipants: DocumentParticipant[]): Document => {
  const participants = sourceParticipants.slice().map((p) => ({
    ...p,
    signedDate: random.arrayElement([date.past(), null]),
  }));

  participants.length = random.number(participants.length) ?? 1;

  return {
    participants,
    id: random.uuid(),
    title: lorem.sentence(),
    signedDate: random.arrayElement([date.past(), null]),
  };
};

export const getFakeData = (): Promise<Data> => {
  const participants = new Array(10).fill(null).map(participantFactory) as DocumentParticipant[];

  return Promise.resolve({
    participants,
    documents: new Array(ELEMENTS_COUNT).fill(null).map(() => elementFactory(participants)),
  });
};
