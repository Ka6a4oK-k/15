import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initTiles, shuffleTiles, moveTile } from '../../store/tilesSlice'
import Congrats from '../Congrats/Congrats'
import Tile from '../Tile/Tile'
import './GameField.css'

export default function GameField({ cols, rows }) {

  const {tiles, solved, numOfRows, numOfColumns } = useSelector(state => state.tiles)
  const dispatch = useDispatch()

  const [width, setWidth] = useState(window.innerWidth)
  const [height, setHeight] = useState(window.innerHeight)

  window.addEventListener('resize', () => {
    setWidth(window.innerWidth)
    setHeight(window.innerHeight)
  })

  useEffect(() => {
    dispatch(initTiles())
    dispatch(shuffleTiles())
  }, [numOfRows, numOfColumns])

  const  onTileClick = (tile) => {
      const emptyTile = tiles.find((tile) => tile.empty)
      dispatch(moveTile({ tile, emptyTile }))
  }

  return (
    <div className='game-field__wrapper'
      style={{
        height: `calc(${height}px - 4.125rem)`,
        width:  ((numOfColumns / numOfRows) < (width / height)) ? `calc((${(height)}px - 4.125rem) / ${(numOfRows / numOfColumns)} - 2rem)` : `calc((${(height)}px - 4.125rem) / ${(height/width)} - 2rem)` 
      }}>
      <div className='game-field' style={{paddingTop: `calc(${100*numOfRows/numOfColumns}% - 0rem)`}}>
        {
          tiles.map((element, index) => {
            if (!element.empty) {
              return <Tile
                key={index}
                element={element}
                top={`calc(${100 / numOfRows * (element.y-1)}% + 1px)`}
                left={`calc(${100 / numOfColumns * (element.x-1)}% + 1px)`}
                width={`calc(${100 / numOfColumns}% - 2px)`}
                height={`calc(${100 / numOfRows}% - 2px)`}
                fontSize={`calc(${100 / numOfRows / 3}vh)`}
                onClick={() => onTileClick(element)}
              />
            }
          })
        }
        {solved ? <Congrats onClick={() => {dispatch(shuffleTiles())}}/> : false}
      </div>
    </div>
  )
}
