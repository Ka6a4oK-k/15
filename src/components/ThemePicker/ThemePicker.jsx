import React from 'react'
import './ThemePicker.css'

export default function ThemePicker({close, active}) {
  return (
    <div className={active ? 'theme-picker theme-picker-active' : 'theme-picker'}>
        <form action="" className="theme-picker-form">
          <input type="radio" name="theme" id="theme-1" />
          <label htmlFor="theme-1">Theme-1</label>
          <input type="radio" name="theme" id="theme-2" />
          <label htmlFor="theme-2">Theme-2</label>
          <input type="radio" name="theme" id="theme-3" />
          <label htmlFor="theme-3">Theme-3</label>
          <input type="radio" name="theme" id="theme-4" />
          <label htmlFor="theme-4">Theme-4</label>
        </form>
    </div>
  )
}
