import React from 'react'
import './Congrats.css'

export default function Congrats({onClick}) {
  return (
    <div className='congrats'>
        <button onClick={onClick}>Restart</button>
    </div>
  )
}
