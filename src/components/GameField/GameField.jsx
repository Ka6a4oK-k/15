import React, { useEffect, useRef, useState } from 'react'
import Tile from '../Tile/Tile'
import './GameField.css'

export default function GameField({cols, rows}) {

  const [numOfCols, setNumOfCols] = useState(4)
  const [numOfRows, setNumOfRows] = useState(4)
  const [tilesArray, setTilesArray] = useState([])

  useEffect(() => {
    const arr = []
    for (let y = 0; y < numOfRows; y++) {
      for (let x = 0; x < numOfCols; x++) {
        arr.push({
          num : (y*numOfCols + x+1),
          x: x+1,
          y: y+1,
        })
      }
    }
    setTilesArray([...arr])
  }, [])

  return (
    <div className='game-field__wrapper'>
        <div className='game-field' onClick={() => {console.log(tilesArray);}}>
          {
            tilesArray.map((element, index) => {
              if(!(tilesArray.length === index+1)) {
                return <Tile element={element}/>
              }
              
            })
          }
        </div>
    </div>
  )
}
