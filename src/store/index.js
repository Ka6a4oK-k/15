import {configureStore} from '@reduxjs/toolkit'
import tilesReducer from './tilesSlice'

export default configureStore({
    reducer: {
        tiles: tilesReducer,
    }
})