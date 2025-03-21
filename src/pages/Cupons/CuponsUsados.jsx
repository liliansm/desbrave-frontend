import React from "react";
import "./CuponsUsados.css";
import { MdStarOutline } from "react-icons/md";
import Sidebar from "../../components/Sidebar/Sidebar";
import NavbarDashboard from "../../components/NavbarDashboard/NavbarDashboard";

export default function CuponsUsados() {
  return (
    <Sidebar>
      <div className="containerCupons">
        <NavbarDashboard />

        <h2 className="tituloPagina">Meus Cupons</h2>

        <div className="boxEstrela">
          <div className="boxEstrelaInterno">
            <span><MdStarOutline className="iconeEstrela" /></span>
            <h1 className="tituloEstrela">Estrelas</h1>
            <span>20</span>
          </div>
          <a href="/Scanner"><button className="botaoResgatarMais">Resgatar Mais</button></a>
          <button className="botaoCuponsUsados">Cupons Usados</button>
          <a href="/cupons" className="voltarLogin">↩ Voltar para meus cupons</a>
        </div>
        <div className="gradeCuponsUsados">
          <h2 className="h1">Cupons Usados</h2>
          <div className="gridCupons">
            <div className="cupomDesabilitado">
              <h3 className="tituloCupom">5% OFF</h3>
              <p className="descricaoCupom">COM APENAS 01 ESTRELA</p>
              <button className="botaoCupomExpirado">&gt;&gt; EXPIRADO</button>
            </div>
            <div className="cupomDesabilitado">
              <h3 className="tituloCupom">10% OFF</h3>
              <p className="descricaoCupom">COM APENAS 5 ESTRELAS</p>
              <button className="botaoCupomExpirado">&gt;&gt; EXPIRADO</button>
              <div className="avisoUso">Você já utilizou esse cupom.</div>
            </div>
          </div>
        </div>
      </div>
    </Sidebar>
  );
}

