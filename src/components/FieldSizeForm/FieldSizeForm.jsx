import React, { useState } from 'react'
import './FieldSizeForm.css'
import { useDispatch, useSelector } from 'react-redux'
import { setNumOfRows, setNumOfColumns } from '../../store/tilesSlice'

export default function FieldSizeForm({close}) {

  const dispatch = useDispatch()
  const { numOfRows, numOfColumns } = useSelector(state => state.tiles)

  const min = 3
  const max = 9
  const [columns, setColumns] = useState(numOfColumns)
  const [rows, setRows] = useState(numOfRows)

  const acceptSize = () => {
    dispatch(setNumOfRows(rows))
    dispatch(setNumOfColumns(columns))
  }

  return (
    <div className='field-size'>
      <p>Columns: {columns}</p>
      <input
        type="range"
        value={columns}
        min={min}
        max={max}
        onChange={(e) => { setColumns(e.target.value) }}
      />
      <p>Rows: {rows}</p>
      <input
        type="range"
        value={rows}
        min={min}
        max={max}
        onChange={(e) => { setRows(e.target.value) }}
      />
      <button className='btn' onClick={() => {acceptSize(); close()}}>Accept</button>
    </div>
  )
}
