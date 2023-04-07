import React from 'react'
import './Tile.css'

export default function Tile({element, onClick, top, left, width, height, fontSize}) {

  return (
    <div
      className='tile'
      onClick={onClick}
      style={{ top, left, width, height, fontSize}}
    >
      {element.num}
    </div>
  )
}
