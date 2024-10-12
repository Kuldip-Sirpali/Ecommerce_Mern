import React from 'react'
import { NavLink } from 'react-router-dom'
const SideBar = () => {
  return (

    <aside className="min-w-40  bg-green-400 text-white">
      <div className="p-4 text-4xl font-bold cursor-pointer">
        <NavLink to="/">
          eCom
        </NavLink>
      </div>
      <nav>
        <ul>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "bg-[#F3F4F6] text-black p-4 block " : "p-4  block "
              }
            >
              Dashboard
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/users"
              className={({ isActive }) =>
                isActive ? "bg-[#F3F4F6] text-black  p-4  block" : " p-4 block"
              }
            >
              Users
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                isActive ? "bg-[#F3F4F6] text-black p-4  block" : "p-4 block"
              }
            >
              Products
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/upload"
              className={({ isActive }) =>
                isActive ? "bg-[#F3F4F6] text-black p-4  block" : "p-4 block"
              }
            >
              Upload
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/auth"
              className={({ isActive }) =>
                isActive ? "bg-[#F3F4F6] text-black p-4 block" : "p-4  block"
              }
            >
              Authentication
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>

  )
}

export default SideBar