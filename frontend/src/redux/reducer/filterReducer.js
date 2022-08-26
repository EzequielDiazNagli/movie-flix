const initialState = {
    // cities: [],
    // oneCity: [],
    search: ""
    
}

const filterReducer = (state = initialState, action) => {
        
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
            console.log("redu",action.payload)

            // let filter = state.cities.filter(city => city.name.toLowerCase().startsWith(action.payload.toLowerCase().trim()))
            return {                        
                ...state,
                search: action.payload
            }
        default:
            return state
    }
}
export default filterReducer