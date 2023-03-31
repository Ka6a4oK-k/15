import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { shuffleTiles } from '../../store/tilesSlice'

import './OptionsBar.css'

export default function OptionsBar() {

    const [fieldOptionActive, setFieldOptionActive] = useState(false)
    const dispatch = useDispatch()

    return (
        <div className='options-bar__wrapper'>
            <div className='options-bar'>
                <button className="shuffle" onClick={() => {dispatch(shuffleTiles())}}>Shuffle</button>
                <button className="field-size" onClick={() => setFieldOptionActive(!fieldOptionActive)}>Field size</button>
                <button className="theme">Theme</button>
            </div>
            <div className={fieldOptionActive ? "field-size__picker field-size__picker-active" : "field-size__picker"}></div>
        </div>
    )
}
