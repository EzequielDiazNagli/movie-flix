const initialState = {
    // cities: [],
    // oneCity: [],
    filterCity: []
}

const citiesReducer = (state = initialState, action) => {
        
    switch (action.type) {
        // case 'GET_CITIES':
        //     return {
        //         ...state,
        //         cities: action.payload,
        //     }
        // case "GET_ONE_CITY":
        //     return {
        //         ...state,
        //         oneCity: action.payload,
        //     }
        case 'FILTER_REDUCER':
            // let filter = state.cities.filter(city => city.name.toLowerCase().startsWith(action.payload.toLowerCase().trim()))
            return {                        
                ...state,
                filterCity: filter
            }
        default:
            return state
    }
}
export default citiesReducer