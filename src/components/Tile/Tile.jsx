import React from 'react'
import './Tile.css'

export default function Tile({element, onClick}) {



  return (
    <div
      className='tile'
      onClick={onClick}
      style={{ top: `calc(${25 * (element.y - 1)}% + 1px)`, left: `calc(${25 * (element.x - 1)}% + 1px)` }}
    >
      {element.num}
    </div>
  )
}
