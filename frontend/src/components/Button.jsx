import React from 'react'

const Button = ({ onClick, className, content, children }) => {
  return (
    <button onClick={onClick} className={`${className} text-white  w-full p-1 rounded-md`} > {children}</button >
  )
}

export default Button