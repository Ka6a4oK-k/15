import {createSlice} from '@reduxjs/toolkit'

const tilesSlice = createSlice({
    name: 'tiles',
    initialState: {
        numOfRows: 4,
        numOfColumns: 4,
        tiles: [],
        solved: false
    },
    reducers: {
        initTiles(state) {
            state.tiles = []
            for (let y = 0; y < state.numOfRows; y++) {
                for (let x = 0; x < state.numOfColumns; x++) {
                    state.tiles.push({
                        num: (y * state.numOfColumns + x + 1),
                        x: x + 1,
                        y: y + 1,
                        empty: (y === state.numOfRows - 1 && x === state.numOfColumns - 1)
                    })
                }
            }
        },
        shuffleTiles(state) {
            function shuffle(tilesArr) {
                tilesArr.sort((a, b) => 0.5 - Math.random())
                tilesArr.map((tile, index) => {
                    tile.x = (index) % state.numOfColumns + 1
                    tile.y = Math.floor((index) / state.numOfRows) + 1
                })
                if (!isSolvable(tilesArr)) {
                    shuffle(tilesArr)
                }
            }
            function isSolvable(tilesArr) {
                const emptyTile = tilesArr.find((tile) => tile.empty)
                if (!emptyTile) {
                    return
                }
                const sum = tilesArr.reduce((sumOfTilesCuplesNumbers, currentTile, index) => {
                    if (currentTile.empty) return sumOfTilesCuplesNumbers
                    const tilesAfterCurrent = tilesArr.slice(index + 1, tilesArr.length)
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
            state.solved = false
            shuffle(state.tiles)
            if(!isSolvable(state.tiles)){
                shuffle(state.tiles)
            }
        },
        moveTile(state, action) {
            const tile = action.payload.tile
            const tileIndex = state.tiles.findIndex((element => element.num === tile.num))
            const emptyTile = action.payload.emptyTile
            const emptyTileIndex = state.tiles.findIndex((element => element.empty))
            if (((tile.x - emptyTile.x === 1) && (tile.y - emptyTile.y === 0)) ||
                ((tile.x - emptyTile.x === -1) && (tile.y - emptyTile.y === 0)) ||
                ((tile.x - emptyTile.x === 0) && (tile.y - emptyTile.y === 1)) ||
                ((tile.x - emptyTile.x === 0) && (tile.y - emptyTile.y === -1))) {
                    state.tiles[tileIndex].x = emptyTile.x
                    state.tiles[tileIndex].y = emptyTile.y
                    state.tiles[emptyTileIndex].x = tile.x
                    state.tiles[emptyTileIndex].y = tile.y
            }
            function isSolved(tiles) {
                return tiles.every((tile) => {
                    return tile.num === tile.x + (tile.y - 1) * state.numOfRows
                })
            }
            if (isSolved(state.tiles)) {
                state.solved = true
            }
        },
        setNumOfRows(state, action) {
            state.numOfRows = action.payload
        },
        setNumOfColumns(state, action) {
            state.numOfColumns = action.payload
        },
    }
})

export const { initTiles, shuffleTiles, moveTile } = tilesSlice.actions

export default tilesSlice.reducer