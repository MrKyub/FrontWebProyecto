import React from 'react'
import { NavLink } from 'react-router-dom'

const Menu = () => {
  return (
    <nav className = 'main-navbar'>
        <ul className = 'd-flex justify-content-start px-5 py-3'>
            <li className = 'nav-item'>
                <NavLink
                className = {({isActive}) => (`link ${isActive ? 'active' : ''}`)}
                to = '/'>
                    Alumnos
                </NavLink>

                <NavLink
                className = {({isActive}) => (`link ${isActive ? 'active' : ''}`)}
                to = '/secundaria'>
                    Carreras
                </NavLink>

                <NavLink
                className = {({isActive}) => (`link ${isActive ? 'active' : ''}`)}
                to = '/terciaria'>
                    Docentes
                </NavLink>
            </li>
        </ul>
    </nav>
  )
}

export default Menu