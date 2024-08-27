type LevelData = {
  id: string;
  name: string;
  imageSrc: string;
  cutSrc: string;
  author: string;
  year: string;
};

type Word = {
  audioExample: string;
  textExample: string;
  textExampleTranslate: string;
  id: number;
  word: string;
  wordTranslate: string;
};

export type Round = {
  levelData: LevelData;
  words: Word[];
};

export type Data = {
  rounds: Round[];
  roundsCount: number;
};

export type DragType = {
  added?: {
    element: string;
    newIndex: number;
  };
  removed?: {
    element: string;
    oldIndex: number;
  };
};

export type moveWordType = ({
  i,
  reverse,
  drag,
}: {
  i: number;
  reverse?: boolean;
  drag?: DragType;
}) => void;
