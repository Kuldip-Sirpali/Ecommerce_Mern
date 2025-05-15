import React from 'react'
import { NavLink } from 'react-router-dom'

const Logo = () => {
  return (
    <NavLink
      className="text-main font-bold text-4xl md:text-3xl"
      to="/"
    >
      ecomartia
    </NavLink>
  )
}

export default Logo
