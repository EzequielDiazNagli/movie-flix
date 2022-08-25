import axios from 'axios';

const filterReducer = {
    // getCities: () => {
    //     return async (dispatch, getState) => {
    //         const res = await axios.get('https://mytinerary-diaz-backend.herokuapp.com/api/cities')
    //         dispatch({ type: 'GET_CITIES', payload: res.data.response.cities })
    //     }
    // },
    // getOneCity: (id) => {
    //     return async (dispatch, getState) => {
    //         const res = await axios.get(`https://mytinerary-diaz-backend.herokuapp.com/api/cities/${id}`)
    //         dispatch({ type: 'GET_ONE_CITY', payload: res.data.response})
    //     }
    // },
    filterReducer: (inputValue) => {
        return (dispatch,getState)=>{
            dispatch({type:'FILTER_REDUCER', payload:inputValue})
        }
    },
}

export default filterReducer;