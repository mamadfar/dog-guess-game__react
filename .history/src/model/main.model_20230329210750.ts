export interface IDogsPics {
  message: string[];
  status: string;
}
export interface IInitialState {
  points: number;
  strikes: number;
  timeRemaining: number;
  highScore: number;
  bigCollection: string[];
  currentQuestion: () => any | null;
  playing: boolean;
  fetchCount: number;
}
