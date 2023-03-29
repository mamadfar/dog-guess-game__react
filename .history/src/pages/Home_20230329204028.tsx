import { useEffect, useState } from "react";
import {useImmerReducer} from "use-immer";
import { IDogsPics, IInitialState } from "../model/main.model";



const dogReducer = (draft: typeof initialState, action: any) => {
  switch (action.type) {
    case "ADD_TO_COLLECTION":
      draft.bigCollection.push(action.value);
      return;
  }
}

const initialState: IInitialState = {
  points: 0,
  strikes: 0,
  timeRemaining: 0,
  highScore: 0,
  bigCollection: [],
  currentQuestion: null,
  playing: false,
  fetchCount: 0
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
      dispatch({type: "ADD_TO_COLLECTION", value: uniquePics})
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
      {/* {dogs.map((dog: string) => (
        <h4>{dog}</h4>
      ))} */}
    </div>
  );
}

export default Home;
