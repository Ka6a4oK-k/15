import React, { useEffect } from 'react'
import './ThemePalette.css'

export default function ThemePalette({id, colors, defaultChecked}) {

    useEffect(() => {
        const root = document.querySelector(':root')
        if (defaultChecked) {
            root.style.setProperty('--clr-optBar-bg', colors[0])
            root.style.setProperty('--clr-body-bg', colors[1])
            root.style.setProperty('--clr-gameFeld-bg', colors[2])
            root.style.setProperty('--clr-btn', colors[3])
            root.style.setProperty('--clr-btn-hover', colors[4])
            root.style.setProperty('--clr-text', colors[3])
            root.style.setProperty('--clr-tile', colors[0])
        }
    }, [])

    const onChange = (e) => {
        const root = document.querySelector(':root')
        if (e.target.checked) {
            root.style.setProperty('--clr-optBar-bg', colors[0])
            root.style.setProperty('--clr-body-bg', colors[1])
            root.style.setProperty('--clr-gameFeld-bg', colors[2])
            root.style.setProperty('--clr-btn', colors[3])
            root.style.setProperty('--clr-btn-hover', colors[4])
            root.style.setProperty('--clr-text', colors[3])
            root.style.setProperty('--clr-tile', colors[0])
        }
        localStorage.setItem('theme', id)
    }

  return (
    <div className='ThemePalette'>
        <input type="radio" name="theme" id={id} defaultChecked={defaultChecked} onChange={(e) => onChange(e)}/>
        <label htmlFor={id}>
            {colors.map((color, index) => {
                return <div key={index} style={{backgroundColor: `${color}`, width: `${100 / colors.length}%`}} ></div>
            })}
        </label>
    </div>
  )
}
