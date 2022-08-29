import Index from "./pages/Index.jsx";
import NavBar from "./components/NavBar";
import { Route, Routes } from "react-router-dom";
import PageSearch from "./pages/PageSearch.jsx";
import Details from "./pages/Details.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Favorite from "./pages/Favorite.jsx";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import userActions from "./redux/actions/userActions.js";


function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    if(localStorage.getItem('token')!== null) {
        const token = localStorage.getItem("token")
        dispatch(userActions.verifyToken(token))
    }
    // eslint-disable-next-line
  },[])


  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
        <Routes>
          <Route path= "/" element={<Index />}/>
          <Route path= "/pagesearch" element={<PageSearch />}/>
          <Route path= "/details/:id" element={<Details />}/>
          <Route path= "/login" element={<Login />}/>
          <Route path= "/register" element={<Register />}/>
          <Route path= "/favorites" element={<Favorite />}/>
          
        </Routes>
    </div>
  );
}

export default App;
