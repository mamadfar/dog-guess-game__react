import { FC } from 'react'

interface IButtonProps {
    handler: () => void;
    title: string;
}

const Button:FC<IButtonProps> = ({title, handler}) => {
  return (
    <button onClick={handler} className="text-white bg-gradient-to-b from-indigo-500 to-indigo-600 px-4 py-3 rounded text-2xl font-bold">
        {title}
    </button>
  )
}

export default Button