import "./Login.css";
import { FaGooglePlus } from "react-icons/fa";
import { FaUser, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";
import { IoEyeOff, IoEye } from "react-icons/io5";
import img_conecta_recife from "../../assets/img_conecta_recife.png";
import gov_br from "../../assets/gov_br.png";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")

  function handleLogin() {
    console.log("Email: ", email)
    console.log("Senha: ", senha)

  }

  return (
    <div className="loginContainer">
      <div className="loginEsquerda">
        <h1>Olá!</h1>
        <p>
          Insira algumas informações e <br />
          comece a sua jornada conosco!
        </p>
        <Link to="/Cadastro">
          <button className="criarConta">Quero criar uma conta</button>
        </Link>
      </div>

      <div className="loginDireita">
        <h2 className="loginTitulo">Login</h2>
        <p className="loginSubtitulo">Entre na sua conta!</p>
        
        <div className="loginformulario">
          <div className="inputCampo">
            <FaUser className="inputIcone" />
            <input type="email" placeholder="E-mail" 
            onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="inputCampo">
            <FaLock className="inputIcone" />
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="Senha" 
              onChange={(e) => setSenha(e.target.value)}
            />
            <span className="Senha" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <IoEyeOff /> : <IoEye />}
            </span>
          </div>
          <Link to="/esqueceuSenha" className="EsqueciSenha">Esqueceu sua senha?</Link>
          <button className="EntrarBotao" onClick={() => handleLogin()}>Entrar</button>
        </div>

        <p className="connecText">Ou conecte-se com:</p>
        <div className="socialIcons">
          <img src= {img_conecta_recife} alt="Conecta Recife" className="socialImg"/>
          <img src= {gov_br} alt="GOVBr" className="socialImg2"/>
          <FaGooglePlus className="GoogleIcon"/>
        </div>
        <div>
        <a href="/" className="voltarinicio">↩ Voltar para o inicio</a>
        </div>
      </div>
    </div>
  );
}
