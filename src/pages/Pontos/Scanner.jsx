import "./Pontos.css";
import { Html5QrcodeScanner, Html5QrcodeScanType } from "html5-qrcode";
import { useEffect, useRef, useState } from "react";
import ScannerComponent from "./ScannerComponent";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import { BsCheck2Circle } from "react-icons/bs";
import elementDesign from "../../assets/element-design.png";
import { api } from "../../service/api";

function Scanner() {
  const navigate = useNavigate();
  const [scanResult, setScanResult] = useState(null);
  const [pontos, setPontos] = useState(null);
  const [cameraPermissionGranted, setCameraPermissionGranted] = useState(false);
  const scannerRef = useRef(null);
  const readerId = "reader";

  const usandoMock = true; 

  const requestCameraPermission = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(() => {
        setCameraPermissionGranted(true);
      })
      .catch((error) => {
        console.error("Permissão da câmera negada ou erro ao acessar a câmera:", error);
        alert("Permissão da câmera é necessária para escanear QR codes.");
        navigate("/PaginaInicial");
      });
  };

  const fetchQRCodeData = async (id) => {
    try {
      if (usandoMock) {
        const mockScanner = {
          id: id,
          codigo: `qrcodes/${id}`,
          nome: "QR Code de Teste",
          descricao: "Descrição do QR Code de Teste",
          pontos: 50,
        };
        setScanResult(mockScanner);
        setPontos(mockScanner.pontos);
        console.log("Dados do QR code:", mockScanner);

        localStorage.setItem("pontuacaoTotal", mockScanner.pontos);
      } else {
        const response = await api.get(`/qrcodes/${id}`);
        setScanResult(response.data);

        console.log("Dados do QR code:", response.data);

        const usuarioId = localStorage.getItem("usuarioId");
        const associacoes = await api.get(`/usuario-qrcode/usuario/${usuarioId}`);
        const qrcodesEscaneados = associacoes.data.map((assoc) => assoc.qrCode.id);

        if (qrcodesEscaneados.includes(parseInt(id))) {
          alert("Você já escaneou esse QR Code!");
          navigate("/Mapa");
          return;
        }

        const res = await api.post("/usuario-qrcode", {
          usuarioId: usuarioId,
          qrCodeId: id,
        });

        setPontos(res.data.pontuacaoTotal);
        localStorage.setItem("pontuacaoTotal", res.data.pontuacaoTotal);
      }
    } catch (error) {
      console.error("Erro inesperado:", error.message);
      if (!usandoMock) {
        navigate("/InvalidScanner"); // Só navega se não for mock
      }
    }
  };

  useEffect(() => {
    const pontosSalvos = localStorage.getItem("pontuacaoTotal");
    if (pontosSalvos) {
      setPontos(parseInt(pontosSalvos));
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    if (!cameraPermissionGranted) {
      requestCameraPermission();
      return;
    }

    if (scanResult || !isMounted) return;

    let scanner;

    const startScanner = () => {
      const readerElement = document.getElementById(readerId);
      if (!readerElement) return;

      readerElement.classList.remove("ready");
      readerElement.style.width = window.innerWidth + "px";
      readerElement.style.height = window.innerHeight + "px";

      if (scannerRef.current) {
        scannerRef.current.clear().catch((e) => console.warn("Erro ao limpar scanner:", e));
        scannerRef.current = null;
      }

      scanner = new Html5QrcodeScanner(readerId, {
        qrbox: { width: 250, height: 250 },
        fps: 5,
        disableFlip: true,
        supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
      });

      scannerRef.current = scanner;

      scanner.render(
        (result) => {
          if (!isMounted) return;
          console.log("Código escaneado:", result);

          const regex = /qrcodes\/(\d+)/;
          const match = result.match(regex);

          if (match) {
            const id = match[1];
            console.log("ID extraído:", id);
            fetchQRCodeData(id);
          } else {
            console.warn("QR Code inválido");
            navigate("/InvalidScanner");
            if (!usandoMock) {
              navigate("/InvalidScanner");
            }
          }

          scanner.clear().catch((e) => console.warn("Erro ao limpar scanner:", e));
          scannerRef.current = null;
        },
        (error) => {
          if (!isMounted) return;
          if (error !== "NotFoundException") {
            console.warn("Erro ao escanear:", error);
          }
        }
      );

      setTimeout(() => {
        const reader = document.getElementById(readerId);
        if (reader) {
          reader.classList.add("ready");
        }
      }, 300);
    };

    startScanner();

    let lastWidth = window.innerWidth;
    let resizeTimeout;

    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const newWidth = window.innerWidth;

        if (Math.abs(newWidth - lastWidth) > 50) {
          lastWidth = newWidth;
          console.log("Redimensionando scanner...");
          startScanner();
        } else {
          console.log("Redimensionamento ignorado");
        }
      }, 500);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      isMounted = false;
      if (scannerRef.current) {
        scannerRef.current.clear().catch((e) => console.warn("Erro ao limpar scanner:", e));
        scannerRef.current = null;
      }
      window.removeEventListener("resize", handleResize);
    };
  }, [scanResult, cameraPermissionGranted]);

  return (
    <div>
      <ScannerComponent />
      {scanResult ? (
        <section className="vector-section">
          <div className="initial-vector">
            <div className="title-container">
              <BsCheck2Circle className="vector-img" />
              <div className="text-container">
                <h2>QR CODE ESCANEADO COM SUCESSO!</h2>
                <p>
                  {pontos && (
                    <span>
                      Você resgatou <strong>{pontos}</strong> pontos!!
                    </span>
                  )}
                </p>
              </div>
            </div>
          </div>
          <div className="button-container">
            <Button
              text="Continuar Explorando"
              color="#0367A5"
              size="small"
              onClick={() => {
                if (scannerRef.current) {
                  scannerRef.current.clear().catch((e) => console.warn("Erro ao limpar scanner:", e));
                  scannerRef.current = null;
                }
                setScanResult(null);
                navigate("/Mapa");
              }}
            />
          </div>
          <img className="pontos-image" src={elementDesign} alt="imagem de elemento" />
        </section>
      ) : (
        <div id={readerId}></div>
      )}
    </div>
  );
}

export default Scanner;
