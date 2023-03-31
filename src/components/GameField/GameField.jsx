import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initTiles, shuffleTiles, moveTile } from '../../store/tilesSlice'
import Congrats from '../Congrats/Congrats'
import Tile from '../Tile/Tile'
import './GameField.css'

export default function GameField({ cols, rows }) {

  const [puzzleSolved, setPuzzleSolved] = useState(false)
  const {tiles, numOfRows, numOfColumns} = useSelector(state => state.tiles)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initTiles())
    dispatch(shuffleTiles())
    if (isSolved(tiles)) {
      dispatch(shuffleTiles())
    }
    setPuzzleSolved(false)
    // const arr = []
    // for (let y = 0; y < numOfRows; y++) {
    //   for (let x = 0; x < numOfCols; x++) {
    //     arr.push({
    //       num: (y * numOfCols + x + 1),
    //       x: x + 1,
    //       y: y + 1,
    //       empty: (y === numOfRows - 1 && x === numOfCols - 1)
    //     })
    //   }
    // }
    // shuffleTiles(arr)
    // setTilesArray([...arr])
    // setPuzzleSolved(false)
  }, [])

  // function shuffleTiles(tiles) {
  //   setPuzzleSolved(false)
  //   const shuffledTiles = [...tiles]
  //   shuffledTiles.sort((a, b) => 0.5 - Math.random())
  //   shuffledTiles.map((element, index) => {
  //     element.x = (index) % numOfCols + 1
  //     element.y = Math.floor((index) / numOfRows) + 1
  //   })
  //   if (isSolved(shuffledTiles)) {
  //     shuffleTiles(tiles)
  //   }
  //   if (isSolvable(shuffledTiles)) {
  //     return shuffledTiles
  //   } else {
  //     shuffleTiles(tiles)
  //   }
  // }

  function onTileClick(tile) {
    (function () {
      const emptyTile = tiles.find((tile) => tile.empty)
      dispatch(moveTile({ tile, emptyTile }))
    }())
    setPuzzleSolved(isSolved(tiles))
  }

  function isSolved(tiles) {
    return tiles.every((tile) => {
      return tile.num === tile.x + (tile.y - 1) * numOfRows
    })
  }

  function isSolvable(tiles) {
    const emptyTile = tiles.find((tile) => tile.empty)
    if(!emptyTile) {
      return
    }
    const sum = tiles.reduce((sumOfTilesCuplesNumbers, currentTile, index) => {
      if (currentTile.empty) return sumOfTilesCuplesNumbers
      const tilesAfterCurrent = tiles.slice(index + 1, tiles.length)
      return sumOfTilesCuplesNumbers + tilesAfterCurrent.reduce((numberOfCouples, nextTile, index) => {
        if (currentTile.num > nextTile.num) {
          return numberOfCouples + 1
        } else return numberOfCouples
      }, 0)
    }, emptyTile.y)
    if (sum % 2 === 0) {
      return true
    } else return false
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
        {puzzleSolved ? <Congrats onClick={() => {dispatch(shuffleTiles())}}/> : false}
      </div>
    </div>
  )
}
