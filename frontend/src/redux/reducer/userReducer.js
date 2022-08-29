const initialState = {
    loggedUser: null,
    snackbar: {
        view: false,
        message: '',
        success: false
    }
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'MESSAGE':
            return {
                ...state,
                snackbar: action.payload
            }
        case 'USER':
            return {
                ...state,
                loggedUser: action.payload.loggedUser,
                snackbar: action.payload.snackbar
            }
        default:
            return state
    }
}

export default usersReducer