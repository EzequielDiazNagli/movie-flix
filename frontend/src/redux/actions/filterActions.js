import axios from 'axios';

const filterAction = {

    
    
    filterReducer: (search) => {
        return (dispatch,getState)=>{
            dispatch({type:'FILTER_REDUCER', payload:search})
        }
    },
}

export default filterAction;