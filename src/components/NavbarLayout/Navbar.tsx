import React from 'react'
import { NavLink } from 'react-router-dom'

type Props = {}

export default function Navbar({}: Props) {
  return (
    <nav className="navbar">
      <div className="container">
        <NavLink to={'/home'}>
          Home
        </NavLink>
        <a href="#">Men</a>
        <a href="#">Women</a>
        <a href="#">Kid</a>
        <a href="#">Sport</a>
      </div>
    </nav>
  )
}