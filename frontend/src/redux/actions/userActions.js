import axios from 'axios';
const urlBack = "http://localhost:4000";

const userActions = {

    
    
    userRegister: (userData) => {
        return async (dispatch, getState) => {
          let res = await axios.post(`${urlBack}/api/register`, { userData });
          dispatch({
            type: "MESSAGE",
            payload: {
              view: true,
              message: res.data.message,
              success: res.data.success,
            },
          });
          return res;
        };
      },
      userLogin: (loggedUser) => {
        return async (dispatch, getState) => {
          let res = await axios.post(`${urlBack}/api/login`, { loggedUser });
          if (res.data.success) {
            localStorage.setItem("token", res.data.response.token);
            dispatch({
              type: "USER",
              payload: {
                loggedUser: res.data.response.userData,
                snackbar: {
                  view: true,
                  message: res.data.message,
                  success: res.data.success,
                },
              },
            });
          } else {
            dispatch({
              type: "MESSAGE",
              payload: {
                view: true,
                message: res.data.message,
                success: res.data.success,
              },
            });
          }
          return res;
        };
      },
      userLogout: () => {
        return async (dispatch, getState) => {
          localStorage.removeItem("token");
          dispatch({
            type: "USER",
            payload: {
              loggedUser: null,
              snackbar: {
                message: "You have signed out.",
                view: true,
                success: true,
              },
            },
          });
          dispatch({
            type: "FAVORITES",
            payload: [],
          });
        };
      },
      verifyToken: (token) => {
        return async (dispatch, getState) => {
          await axios
            .get(`${urlBack}/api/logintoken`, {
              headers: { Authorization: "Bearer " + token },
            })
            .then((user) => {
              if (user.data.success) {
                dispatch({
                  type: "USER",
                  payload: {
                    loggedUser: user.data.response,
                    snackbar: {
                      view: true,
                      message: user.data.response.message,
                      success: user.data.success,
                    },
                  },
                });
              } else {
                {
                  localStorage.removeItem("token");
                }
              }
            })
            .catch((error) => {
              if (error.response.status === 401)
                //token is there but isn't correct
                dispatch({
                  type: "MESSAGE",
                  payload: {
                    view: true,
                    message: "Please, sign in once again.",
                    success: false,
                  },
                });
              localStorage.removeItem("token");
            });
        };
      },

      pushFav: (idMovies) => {
        const token = localStorage.getItem("token")
        return async (dispatch, getState) => {
          // console.log(token)
          const res = await axios.put(`${urlBack}/api/pushfav`, {idMovies} , {headers: { Authorization: "Bearer " + token},})
          console.log(res)
            dispatch({
              type: "FAVORITES",
              payload: res.data.response
            });
          return res
        };
      },

      getOneUser: () => {
        const token = localStorage.getItem("token")
        return async (dispatch, getState) => {
          const res = await axios.get(`${urlBack}/api/getoneuser`, {headers: { Authorization: "Bearer " + token},})
          dispatch({
            type: "FAVORITES",
            payload: res.data.response
          });
        };
      },

      lastMovies: (lastmovies) => {
      
        return async (dispatch, getState) => {
      dispatch({
            type: "LAST_MOVIES",
            payload: lastmovies
          });
          
        
        };
      },
}

export default userActions;