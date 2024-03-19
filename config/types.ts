type Round = {
  levelData: Record<string, string>;
  words: [Record<string, string> & { id: number }];
};

export type LvlData = {
  rounds: Round[];
  roundsCount: number;
};
