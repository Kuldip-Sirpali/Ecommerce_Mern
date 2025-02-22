import React from 'react'

const Button = ({ onClick, className, content, children }) => {
  return (
    <button onClick={onClick} className={`${className} text-white  `} > {children}</button >
  )
}

export default Button