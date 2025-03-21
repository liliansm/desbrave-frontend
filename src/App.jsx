import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PaginaInicial from "./pages/Pontos/PaginaInicial";
import Scanner from "./pages/Pontos/Scanner";
import Mapa from './pages/Mapa/Mapa';
import Login from "./pages/Login/Login";
import Cadastro from "./pages/Cadastro/Cadastro";
import EsqueceuSenha from "./pages/RecuperaçaoSenha/EsqueceuSenha";
import RecuperarSenha from "./pages/RecuperaçaoSenha/RecuperarSenha";
import RedefinirSenha from "./pages/RecuperaçaoSenha/RedefinirSenha";
import Diretrizes from "./components/Diretrizes/Diretrizes";
import InvalidScanner from "./pages/Pontos/InvalidScanner";
import Forum from "./pages/Forum/Foruns";
import ForumChat from "./pages/ChatForum/Chatforum";
import Curso from "./pages/Curso/Curso";
import Sobre from "./pages/Sobre/Sobre";
import Parceiros from "./pages/Parceiros/Parceiros";
import Dashboard from "./pages/Dashboard/Dashboard";
import DescricaoCurso from './pages/Curso/DescricaoCurso';
import GestForm from "./pages/GestCurso/Gestcurso";
import CuponsDashboard from './pages/Cupons/CuponsDashboard';
import CuponsUsados from "./pages/Cupons/CuponsUsados";
import MeusCursos from "./pages/MeusCursos/MeusCursos"

function App() {
  const [isLogged, setIsLogged] = useState(!!localStorage.getItem("user"));

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/paginaInicial" element={<PaginaInicial />} />
        <Route path="/invalidScanner" element={<InvalidScanner />} />
        <Route path="/esqueceuSenha" element={<EsqueceuSenha />} />
        <Route path="/recuperarSenha" element={<RecuperarSenha />} />
        <Route path="/redefinirSenha" element={<RedefinirSenha />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/diretrizes" element={<Diretrizes />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/curso" element={<Curso />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mapa" element={<Mapa />} />
        <Route path="/scanner" element={<Scanner />} />
        <Route path="/cupons" element={<CuponsDashboard />} />
        <Route path="/descricaoCurso/:id" element={<DescricaoCurso />} />
        <Route path="/parceiros" element={<Parceiros />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/CuponsUsados" element={<CuponsUsados />} />
        <Route path="/Forum" element={<Forum />} />
        <Route path="/forumChat" element={<ForumChat />} />
        <Route path="/gestao" element={<GestForm />} />
        <Route path="/meusCursos" element={<MeusCursos/>} />
      </Routes>
    </Router>
  );
}

export default App;