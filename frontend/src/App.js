import Index from "./pages/Index.jsx";
import NavBar from "./components/NavBar";
import { Route, Routes } from "react-router-dom";
import PageSearch from "./pages/PageSearch.jsx";
import Details from "./pages/Details.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Favorite from "./pages/Favorite.jsx";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import userActions from "./redux/actions/userActions.js";
import moviesActions from "./redux/actions/moviesActions.js";


function App() {
  const dispatch = useDispatch()
  const [reload,setReload] = useState(false)
  const loggedUser = useSelector(store => store.userReducer.loggedUser)

  async function getLatestMovie() {
    await fetch(
    "https://api.themoviedb.org/3/movie/now_playing?api_key=ee2648f9f1e9bd8b7424b1f5bb21b561&language=en-US&page=1"
    )
    .then((response) => response.json())
    .then((json) => dispatch(moviesActions.lastMovies(json.results)));
  }

  useEffect(() => {
    if(localStorage.getItem('token')!== null) {
        const token = localStorage.getItem("token")
        dispatch(userActions.verifyToken(token))
    }
    getLatestMovie()
    // eslint-disable-next-line
  },[!reload])

  useEffect(() => {
    dispatch(userActions.getOneUser())
  },[loggedUser])


  return (
    <div className="flex flex-col min-h-screen">
      <NavBar/>
        <Routes>
          <Route path= "/" element={<Index/>}/>
          <Route path= "/pagesearch" element={<PageSearch />}/>
          <Route path= "/details/:id" element={<Details />}/>
          <Route path= "/login" element={<Login />}/>
          <Route path= "/register" element={<Register />}/>
          <Route path= "/favorites" element={<Favorite setReload={setReload} />}/>
        </Routes>
    </div>
  );
}

export default App;
