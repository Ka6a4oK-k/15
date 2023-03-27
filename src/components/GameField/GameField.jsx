import React, { useEffect, useRef, useState } from 'react'
import Tile from '../Tile/Tile'
import './GameField.css'

export default function GameField({ cols, rows }) {

  const [numOfCols, setNumOfCols] = useState(4)
  const [numOfRows, setNumOfRows] = useState(4)
  const [tilesArray, setTilesArray] = useState([])

  useEffect(() => {
    const arr = []
    for (let y = 0; y < numOfRows; y++) {
      for (let x = 0; x < numOfCols; x++) {
        arr.push({
          num: (y * numOfCols + x + 1),
          x: x + 1,
          y: y + 1,
          empty: (y===numOfRows-1 && x===numOfCols-1)
        })
      }
    }
    setTilesArray([...arr])
  }, [])

  function moveTile(tile){
    const emptyTile = tilesArray.find((element) => element.empty)
    // console.log(tile);
    // console.log(emptyTile);
    if((tile.x - emptyTile.x === 1) && (tile.y - emptyTile.y === 0)) {
      const tempTileX = emptyTile.x
      emptyTile.x = tile.x
      tile.x = tempTileX
      // console.log('move left');
      setTilesArray([...tilesArray])
      return
    }
    if((tile.x - emptyTile.x === -1) && (tile.y - emptyTile.y === 0)) {
      const tempTileX = emptyTile.x
      emptyTile.x = tile.x
      tile.x = tempTileX
      // console.log('move right');
      setTilesArray([...tilesArray])
      return
    }
    if((tile.x - emptyTile.x === 0) && (tile.y - emptyTile.y === 1)) {
      const tempTileY = emptyTile.y
      emptyTile.y = tile.y
      tile.y = tempTileY
      // console.log('move up');
      setTilesArray([...tilesArray])
      return
    }
    if((tile.x - emptyTile.x === 0) && (tile.y - emptyTile.y === -1)) {
      const tempTileY = emptyTile.y
      emptyTile.y = tile.y
      tile.y = tempTileY
      // console.log('move down');
      setTilesArray([...tilesArray])
      return
    }

  }

  return (
    <div className='game-field__wrapper'>
      <div className='game-field'>
        {
          tilesArray.map((element, index) => {
            if (!(tilesArray.length === index + 1)) {
              return <Tile key={index} element={element} onClick={() => moveTile(element)}/>
            } 
            return
          })
        }
      </div>
    </div>
  )
}
