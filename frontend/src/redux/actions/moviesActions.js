// import axios from 'axios';

const moviesActions = {

    lastMovies: (lastMovies) => {
        return (dispatch,getState)=>{
            dispatch({type:'LAST_MOVIES', payload:lastMovies})
        }
    },

    filterMovies: (search) => {
        return (dispatch,getState)=>{
            dispatch({type:'FILTER_MOVIES', payload:search})
            dispatch({type:'SEARCH_MOVIES', payload:search})
        }
    },
}

export default moviesActions;