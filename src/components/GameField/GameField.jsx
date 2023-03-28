import React, { useEffect, useRef, useState } from 'react'
import Congrats from '../Congrats/Congrats'
import Tile from '../Tile/Tile'
import './GameField.css'

export default function GameField({ cols, rows }) {

  const [numOfCols, setNumOfCols] = useState(4)
  const [numOfRows, setNumOfRows] = useState(4)
  const [tilesArray, setTilesArray] = useState([])
  const [puzzleSolved, setPuzzleSolved] = useState(false)

  useEffect(() => {
    const arr = []
    for (let y = 0; y < numOfRows; y++) {
      for (let x = 0; x < numOfCols; x++) {
        arr.push({
          num: (y * numOfCols + x + 1),
          x: x + 1,
          y: y + 1,
          empty: (y === numOfRows - 1 && x === numOfCols - 1)
        })
      }
    }
    shuffleTiles(arr)
    setTilesArray([...arr])
    setPuzzleSolved(false)
  }, [])

  function shuffleTiles(tiles) {
    setPuzzleSolved(false)
    const shuffledTiles = [...tiles]
    shuffledTiles.sort((a, b) => 0.5 - Math.random())
    shuffledTiles.map((element, index) => {
      element.x = (index) % numOfCols + 1
      element.y = Math.floor((index) / numOfRows) + 1
    })
    if (isSolved(shuffledTiles)) {
      shuffleTiles(tiles)
    }
    if (isSolvable(shuffledTiles)) {
      return shuffledTiles
    } else {
      shuffleTiles(tiles)
    }
  }

  function moveTile(tile) {
    const emptyTile = tilesArray.find((element) => element.empty)
    if (((tile.x - emptyTile.x === 1) && (tile.y - emptyTile.y === 0)) ||
      ((tile.x - emptyTile.x === -1) && (tile.y - emptyTile.y === 0)) ||
      ((tile.x - emptyTile.x === 0) && (tile.y - emptyTile.y === 1)) ||
      ((tile.x - emptyTile.x === 0) && (tile.y - emptyTile.y === -1))) {
      const tempTile = { ...emptyTile }
      emptyTile.x = tile.x
      emptyTile.y = tile.y
      tile.x = tempTile.x
      tile.y = tempTile.y
      setTilesArray([...tilesArray])
    }
    if(isSolved(tilesArray)){
      setPuzzleSolved(true)
    }
  }

  function isSolved(tiles) {
    return tiles.every((tile) => {
      return tile.num === tile.x + (tile.y - 1) * numOfRows
    })
  }

  function isSolvable(tiles) {
    const emptyTile = tiles.find((tile) => tile.empty)
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
          tilesArray.map((element, index) => {
            if (!element.empty) {
              return <Tile key={index} element={element} onClick={() => moveTile(element)} />
            }
            // return
          })
        }
        {/* <div className={puzzleSolved ? "congrats congrats-active" : "congrats"}></div> */}
        {puzzleSolved ? <Congrats onClick={() => {shuffleTiles(tilesArray)}}/> : false}
      </div>
    </div>
  )
}
