import { BsClockHistory } from "react-icons/bs";
import { HeartIcon } from '../../../components';

const Questions = () => {
  return (
    <>
    <p className="text-center">
      <span className="text-zinc-400 mr-3">
        <BsClockHistory
          className={`inline-block w-8 h-8 ${
            state.playing ? "animate-spin" : ""
          }`}
        />
        <span className="font-mono text-4xl relative top-2 ml-3">
          0:
          {state.timeRemaining < 10
            ? `0${state.timeRemaining}`
            : state.timeRemaining}
        </span>
      </span>
      {[...Array(3 - state.strikes)].map((item, index) => (
        <HeartIcon
          key={index}
          className="w-7 h-7 inline text-pink-600 mx-1"
        />
      ))}
      {[...Array(state.strikes)].map((item, index) => (
        <HeartIcon
          key={index}
          className="w-7 h-7 inline text-pink-100 mx-1"
        />
      ))}
    </p>
    <h1 className="text-center font-bold pt-3 pb-10 break-all text-4xl md:text-7xl">
      {state.currentQuestion.breed}
    </h1>
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 px-5">
      {state.currentQuestion.photos.map((photo, index) => (
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
  )
}

export default Questions