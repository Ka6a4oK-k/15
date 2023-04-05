import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { shuffleTiles } from '../../store/tilesSlice'

import './OptionsBar.css'
import FieldSizeForm from '../FieldSizeForm/FieldSizeForm'

export default function OptionsBar() {

    const [fieldSizeOptionActive, setFieldOptionActive] = useState(false)
    const [themeOptionActive, setThemeOptionsActive] = useState(false)

    const closeFieldSizeOptions = () => {
        setFieldOptionActive(false)
    }
    const closeThemeOtions = () => {
        setThemeOptionsActive(false)
    }
    const toggleFieldSizeOptions = () => {
        setFieldOptionActive(!fieldSizeOptionActive)
        setThemeOptionsActive(false)
    }
    const toggleThemeOtions = () => {
        setThemeOptionsActive(!themeOptionActive)
        setFieldOptionActive(false)
    }

    const dispatch = useDispatch()

    return (
        <div className='options-bar__wrapper'>
            <div className='options-bar'>
                <button className="shuffle-btn btn" onClick={() => {dispatch(shuffleTiles())}}>Shuffle</button>
                <button className="field-size-btn btn" onClick={toggleFieldSizeOptions}>Field size</button>
                <button className="theme-btn btn" onClick={toggleThemeOtions}>Theme</button>
            </div>
            <div className={fieldSizeOptionActive ? "field-size__picker field-size__picker-active" : "field-size__picker"}>
                <FieldSizeForm close={closeFieldSizeOptions}/>
            </div>
        </div>
    )
}
