import { BsClockHistory } from "react-icons/bs";
import { HeartIcon } from "../../../components";
import { FC, ReactNode } from "react";
import { IInitialState } from "../../../model/main.model";

interface IQuestionsProps
  extends Omit<IInitialState, "highScore" | "bigCollection" | "fetchCount"> {
  points: number;
  strikes: number;
  timeRemaining: number;
  // highScore: number;
  // bigCollection: string[];
  currentQuestion: null | { breed: string; photos: string[]; answer: number };
  playing: boolean;
  // fetchCount: number;
  children: ReactNode;
}

const Questions: FC<IQuestionsProps> = ({
  playing,
  points,
  strikes,
  timeRemaining,
  currentQuestion,
  children,
}) => {
  return (
    <>
      <p className="text-center">
        <span className="text-zinc-400 mr-3">
          <BsClockHistory
            className={`inline-block w-8 h-8 ${playing ? "animate-spin" : ""}`}
          />
          <span className="font-mono text-4xl relative top-2 ml-3">
            0:
            {timeRemaining < 10 ? `0${timeRemaining}` : timeRemaining}
          </span>
        </span>
        {[...Array(3 - strikes)].map((item, index) => (
          <HeartIcon
            key={index}
            className="w-7 h-7 inline text-pink-600 mx-1"
          />
        ))}
        {[...Array(strikes)].map((item, index) => (
          <HeartIcon
            key={index}
            className="w-7 h-7 inline text-pink-100 mx-1"
          />
        ))}
      </p>
      <h1 className="text-center font-bold pt-3 pb-10 break-all text-4xl md:text-7xl">
        {currentQuestion?.breed}
      </h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 px-5">
        {children}
      </div>
    </>
  );
};

export default Questions;
