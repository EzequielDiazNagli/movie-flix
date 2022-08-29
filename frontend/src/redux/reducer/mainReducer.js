import { combineReducers } from 'redux'
import filterReducer from './filterReducer'
import userReducer from './userReducer'

const mainReducer = combineReducers({

    filterReducer,
    userReducer

})
export default mainReducer