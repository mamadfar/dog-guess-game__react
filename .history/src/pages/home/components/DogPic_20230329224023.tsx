import { FC } from 'react'

interface IDogPicProps {
    index: number;
    guessHandler: (args: unknown) => void;
    photo: string
}

const DogPic:FC<IDogPicProps> = ({index, guessHandler, photo}) => {
  return (
    <div onClick={guessHandler} >
        <img className="object-cover h-40 lg:h-80 w-full shadow-md rounded-lg" src={photo} alt={photo.split("/")[4]} />
    </div>
  )
}

export default DogPic