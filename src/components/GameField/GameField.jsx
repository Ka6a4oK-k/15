import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initTiles, shuffleTiles, moveTile } from '../../store/tilesSlice'
import Congrats from '../Congrats/Congrats'
import Tile from '../Tile/Tile'
import './GameField.css'

export default function GameField({ cols, rows }) {

  const {tiles, solved} = useSelector(state => state.tiles)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initTiles())
    dispatch(shuffleTiles())
  }, [])

  function onTileClick(tile) {
    (function () {
      const emptyTile = tiles.find((tile) => tile.empty)
      dispatch(moveTile({ tile, emptyTile }))
    }())
  }

  return (
    <div className='game-field__wrapper'>
      <div className='game-field'>
        {
          tiles.map((element, index) => {
            if (!element.empty) {
              return <Tile key={index} element={element} onClick={() => onTileClick(element)} />
            }
          })
        }
        {solved ? <Congrats onClick={() => {dispatch(shuffleTiles())}}/> : false}
      </div>
    </div>
  )
}
