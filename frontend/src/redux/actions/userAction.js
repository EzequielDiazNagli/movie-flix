import axios from 'axios';
const urlBack = "http://localhost:4000";

const userAction = {

    
    
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
      userLogout: (closeUser) => {
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
        };
      },
      verifyToken: (token) => {
        return async (dispatch, getState) => {
          await axios
            .get(`${urlBack}/api/auth/signInToken`, {
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
}

export default userAction;