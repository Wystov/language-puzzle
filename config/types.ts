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
