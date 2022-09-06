const initialState = {
    lastMovies: [],
    filterMovies: [],
    searchMovies: ""
}

const movies = (state = initialState, action) => {
        
    switch (action.type) {
        case 'LAST_MOVIES':
            return {                        
                ...state,
                lastMovies: action.payload
            }
        case 'FILTER_MOVIES':
            let filter = state.lastMovies.filter(movie => movie.title.toLowerCase().startsWith(action.payload.toLowerCase().trim()))
            return {                        
                ...state,
                filterMovies: filter
            }
            case 'SEARCH_MOVIES':
            return {                        
                ...state,
                searchMovies: action.payload
            }
        default:
            return state
    }
}
export default movies