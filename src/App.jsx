import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home';
import PaginaInicial from "./components/Pontos/PaginaInicial";
import Scanner from "./components/Pontos/Scanner" 
import Sucesso from "./components/Pontos/sucesso"
import Mapa from './pages/Mapa/Mapa';
import Login from "./components/Login/Login";
import Cadastro from "./components/Cadastro/Cadastro"


function App() {
  const [isLogged, setIsLogged] = useState(!!localStorage.getItem("user"));

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/paginaInicial" element={<PaginaInicial />} />
        <Route path="/mapa" element={<Mapa />} />
        <Route path="/scanner" element={<Scanner />} />
        <Route path="/sucesso" element={<Sucesso />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
      
      </Routes>
    </Router>
  );
}

export default App;
