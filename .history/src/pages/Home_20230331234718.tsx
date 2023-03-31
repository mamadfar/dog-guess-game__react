import { useEffect } from "react";
import { useImmerReducer } from "use-immer";
import { IDogsPics, IInitialState } from "../model/main.model";
import { generateQuestion, onlyUniqueBreeds } from "../util";
import {DogPic, Questions} from "./home/components";
import { Button, StarIcon } from "../components";

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
      if(!draft.playing) return;
      if (action.value === draft.currentQuestion?.answer) {
        draft.points++;
        draft.currentQuestion = generateQuestion(draft);
      } else {
        draft.strikes++;
        if(draft.strikes >= 3) draft.playing = false;
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
              key={index}
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
          <Button title="Play" handler={() => dispatch({ type: "START_PLAYING" })}/>
        </div>
      )}
      {(timeRemaining <= 0 || strikes >= 3) && currentQuestion && (
        <div className="fixed top-0 right-0 left-0 bottom-0 bg-black/90 text-white flex h-screen justify-center items-center text-center">
          {timeRemaining <= 0 && <p className="text-6xl mb-4 font-bold">Time's Up!</p>}
          {strikes >= 3 && <p className="text-6xl mb-4 font-bold">3 Strinkes; You're Out!</p>}
          <p>
            Your score:&nbsp;
            <span className="text-amber-400">
              <StarIcon/>
              {points}
            </span>
            </p>
            <p className="mb-5">Your alltime high score: 0</p>
            <Button title="Play again" className="text-lg" handler={() => dispatch({ type: "START_PLAYING" })}/>
        </div>
      )}
    </div>
  );
}

export default Home;
