import { useEffect, useState } from "react";
import { useImmerReducer } from "use-immer";
import { IDogsPics, IInitialState } from "../model/main.model";
import { generateQuestion, onlyUniqueBreeds } from "../util";

const dogReducer = (draft: typeof initialState, action: any) => {
  switch (action.type) {
    case "ADD_TO_COLLECTION":
      draft.bigCollection.push(action.value);
      break;
    case "START_PLAYING":
      draft.timeRemaining = 30;
      draft.points = 0;
      draft.strikes = 0;
      draft.playing = true;
      draft.currentQuestion = generateQuestion(draft);
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
  const [state, dispatch] = useImmerReducer(dogReducer, initialState);

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
  }, []);

  return (
    <div>
      {!!state.currentQuestion && (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 px-5">
            {state.currentQuestion.photos.map()}
          </div>
        </>
      )}
      {!state.playing &&
        state.bigCollection.length &&
        !state.currentQuestion && (
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
