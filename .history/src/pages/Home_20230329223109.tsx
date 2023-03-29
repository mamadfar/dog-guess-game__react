import { useEffect, useState } from "react";
import { useImmerReducer } from "use-immer";
import { IDogsPics, IInitialState } from "../model/main.model";
import { generateQuestion, onlyUniqueBreeds } from "../util";
import { BsClockHistory } from "react-icons/bs";
import { HeartIcon } from "../components";
import DogPic from "./home/components/DogPic";

const dogReducer = (draft: typeof initialState, action: any) => {
  switch (action.type) {
    case "ADD_TO_COLLECTION":
      draft.bigCollection = draft.bigCollection.concat(action.value);
      break;
    case "START_PLAYING":
      draft.timeRemaining = 30;
      draft.points = 0;
      draft.strikes = 0;
      draft.playing = true;
      draft.currentQuestion = generateQuestion(draft);
      break;
    case "GUESS_ATTEMPT":
      if (action.value === draft.currentQuestion?.answer) {
        draft.points++;
        draft.currentQuestion = generateQuestion(draft);
      } else {
        draft.strikes++;
      }
      break;
  }
};

const initialState: IInitialState = {
  points: 0,
  strikes: 0,
  timeRemaining: 0,
  highScore: 0,
  bigCollection: [],
  currentQuestion: null,
  playing: false,
  fetchCount: 0,
};

function Home() {
  const [{points, strikes, timeRemaining, highScore, bigCollection, currentQuestion, playing, fetchCount}, dispatch] = useImmerReducer(dogReducer, initialState);

  const getDogs = async (controller: AbortController) => {
    try {
      const res = await fetch("https://dog.ceo/api/breeds/image/random/50", {
        signal: controller.signal,
      });
      const data: IDogsPics = await res.json();
      const uniquePics = onlyUniqueBreeds(data.message);
      dispatch({ type: "ADD_TO_COLLECTION", value: uniquePics });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    getDogs(controller);

    //! Clean-up
    return () => controller.abort();
  }, [fetchCount]);

  return (
    <div>
      {!!currentQuestion && (
        <>
          <p className="text-center">
            <span className="text-zinc-400 mr-3">
              <BsClockHistory
                className={`inline-block w-8 h-8 ${
                  playing ? "animate-spin" : ""
                }`}
              />
              <span className="font-mono text-4xl relative top-2 ml-3">
                0:
                {timeRemaining < 10
                  ? `0${timeRemaining}`
                  : timeRemaining}
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
            {currentQuestion.breed}
          </h1>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 px-5">
            {currentQuestion.photos.map((photo, index) => (
              <DogPic
                index={index}
                guessHandler={() =>
                  dispatch({ type: "GUESS_ATTEMPT", value: index })
                }
                photo={photo}
              />
            ))}
          </div>
        </>
      )}
      {!playing &&
        bigCollection.length &&
        !currentQuestion && (
          <div className="grid h-screen place-items-center">
            <button
              onClick={() => dispatch({ type: "START_PLAYING" })}
              className="text-white bg-gradient-to-b from-indigo-500 to-indigo-600 px-4 py-3 rounded text-2xl font-bold"
            >
              Play
            </button>
          </div>
        )}
    </div>
  );
}

export default Home;
