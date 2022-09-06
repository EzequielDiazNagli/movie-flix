import { combineReducers } from 'redux'
import moviesReducer from './moviesReducer'
import userReducer from './userReducer'

const mainReducer = combineReducers({

    userReducer,
    moviesReducer

})
export default mainReducer