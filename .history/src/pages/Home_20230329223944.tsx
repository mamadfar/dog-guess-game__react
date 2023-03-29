import { useEffect, useState } from "react";
import { useImmerReducer } from "use-immer";
import { IDogsPics, IInitialState } from "../model/main.model";
import { generateQuestion, onlyUniqueBreeds } from "../util";
import DogPic from "./home/components/DogPic";
import Questions from "./home/components/Questions";

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
  const [
    {
      points,
      strikes,
      timeRemaining,
      highScore,
      bigCollection,
      currentQuestion,
      playing,
      fetchCount,
    },
    dispatch,
  ] = useImmerReducer(dogReducer, initialState);

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
        <Questions
          points={points}
          playing={playing}
          strikes={strikes}
          timeRemaining={timeRemaining}
          currentQuestion={currentQuestion}
        >
          {currentQuestion.photos.map((photo, index) => (
            <DogPic
              index={index}
              guessHandler={() =>
                dispatch({ type: "GUESS_ATTEMPT", value: index })
              }
              photo={photo}
            />
          ))}
        </Questions>
      )}
      {!playing && bigCollection.length && !currentQuestion && (
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
