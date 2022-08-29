const initialState = {
    loggedUser: null,
    snackbar: {
        view: false,
        message: '',
        success: false
    },
    favorites: [],
    lastMovies:[]
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'MESSAGE':
            return {
                ...state,
                snackbar: action.payload
            }
        case 'FAVORITES':
            return {
                ...state,
                favorites: action.payload
            }
        case 'USER':
            return {
                ...state,
                loggedUser: action.payload.loggedUser,
                snackbar: action.payload.snackbar
            }
        case 'LAST_MOVIES':
            return {
                ...state,
                
                lastMovies: action.payload
            }
        default:
            return state
    }
}

export default usersReducer