import React, { useEffect } from 'react'
import './ThemePicker.css'
import ThemePalette from '../ThemePalette/ThemePalette';

export default function ThemePicker({close, active}) {

  const themes = [
    ["#023047", "#219EBC", "#8ECAE6", "#FFB703", "#FB8500"],
    ["#4A4E69", "#9A8C98", "#F2E9E4", "#9A8C98", "#22223B"],
    ["#3A5A40", "#A3B18A", "#DAD7CD", "#588157", "#344E41"],
    ["#9B5DE5", "#F15BB5", "#FEE440", "#00F5D4", "#00BBF9"],
  ]

  return (
    <div className={active ? 'theme-picker theme-picker-active' : 'theme-picker'}>
      {themes.map((theme, index) => {
        return <ThemePalette
          key={index}
          id={`theme-${index + 1}`}
          colors={theme}
          defaultChecked={localStorage.getItem('theme') === `theme-${index + 1}` || index === 0} />
      })}
    </div>
  )
}
