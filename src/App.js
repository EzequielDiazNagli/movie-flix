import Index from "./pages/Index.jsx";
import NavBar from "./components/NavBar";
import { Route, Routes } from "react-router-dom";
import Buscador from "./pages/Buscador.jsx";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
        <Routes>
          <Route path= "/" element={<Index />}/>
          <Route path= "/buscador" element={<Buscador />}/>
        </Routes>
    </div>
  );
}

export default App;
