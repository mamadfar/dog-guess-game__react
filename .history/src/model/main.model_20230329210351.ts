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
  currentQuestion: () => { breed: string; photos: string[]; answer: number; };
  playing: boolean;
  fetchCount: number;
}
