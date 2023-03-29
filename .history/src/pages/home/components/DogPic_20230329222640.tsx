import React, { FC } from 'react'

interface IDogPicProps {
    index: number;
    dispatch: (args: unknown) => void;
    photo: string
}

const DogPic:FC<IDogPicProps> = ({index, dispatch, photo}) => {
  return (
    <div key={index} onClick={() => dispatch({ type: "GUESS_ATTEMPT", value: index })} >
        <img className="object-cover h-40 lg:h-80 w-full shadow-md rounded-lg" src={photo} alt={photo.split("/")[4]} />
    </div>
  )
}

export default DogPic