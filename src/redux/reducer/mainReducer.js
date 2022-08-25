import { combineReducers } from 'redux'
import filterReducer from './filterReducer'

const mainReducer = combineReducers({

    filterReducer,

})
export default mainReducer