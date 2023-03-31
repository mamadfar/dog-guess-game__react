import { FC } from 'react'

interface IButtonProps {
    handler: () => void;
    title: string;
    className?: string;
}

const Button:FC<IButtonProps> = ({title, handler, className}) => {
  return (
    <button onClick={handler} className={`text-white bg-gradient-to-b from-indigo-500 to-indigo-600 px-4 py-3 rounded text-2xl font-bold ${className ?? ""}`}>
        {title}
    </button>
  )
}

export default Button