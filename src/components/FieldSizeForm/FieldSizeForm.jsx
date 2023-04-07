import React, { useEffect, useState } from 'react'
import './FieldSizeForm.css'
import { useDispatch, useSelector } from 'react-redux'
import { setNumOfRows, setNumOfColumns } from '../../store/tilesSlice'

export default function FieldSizeForm({close, active}) {

  const dispatch = useDispatch()
  const { numOfRows, numOfColumns } = useSelector(state => state.tiles)

  const min = 3
  const max = 9
  const [columns, setColumns] = useState(numOfColumns)
  const [rows, setRows] = useState(numOfRows)

  const acceptSize = () => {
    dispatch(setNumOfRows(rows))
    dispatch(setNumOfColumns(columns))
    close()
  }

  useEffect(() => {
    setColumns(numOfColumns)
    setRows(numOfRows)
  }, [close])

  return (
    <div className={active ? 'field-size-wrapper field-size-wrapper-active' : 'field-size-wrapper'}>
      <div className="field-size-form">
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
        <button className='btn' onClick={() =>  acceptSize() }>Accept</button>
      </div>
    </div>
  )
}
