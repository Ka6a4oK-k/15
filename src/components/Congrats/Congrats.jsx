import React from 'react'
import './Congrats.css'

export default function Congrats({onClick}) {
  return (
    <div className='congrats'>
        <button className='btn' onClick={onClick}>Restart</button>
    </div>
  )
}
