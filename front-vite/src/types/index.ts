export interface Controls {
  isPlayerUp: boolean;
  isPlayerDown: boolean;
  isPlayerLeft: boolean;
  isPlayerRight: boolean;
}

export interface ScoreRecord {
  id: number | string;
  username: string;
  score: number;
  created: string;
}
