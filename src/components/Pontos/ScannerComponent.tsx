import { useEffect } from "react";

function ScannerComponent() {
    useEffect(() => {
        const updateTexts = () => {
            const button = document.querySelector("button");
            if (button && button.innerText.trim() === "Request Camera Permissions") {
                button.innerText = "Permitir Acesso à Câmera";
                button.classList.add("scanner-button")
            }
            const scanLink = document.getElementById("reader__dashboard_section_swaplink");
            if(scanLink) {
                if (scanLink.innerText.trim() === "Scan an Image File") {
                    scanLink.innerText = "Digitalizar um arquivo de imagem";
                }
                if(scanLink.innerText.trim() === "Scan using camera directly") {
                    scanLink.innerText = "Digitalizar usando a câmera diretamente";
                }
            }

            const readerMessage = document.getElementById("reader__header_message");
            if (readerMessage && readerMessage.innerText.trim() === "Requesting camera permissions...") {
                readerMessage.innerText = "Solicitando permissões de câmera...";
            }


            const buttons = document.querySelectorAll("span button");
            const stopScanningButton = Array.from(buttons).find(btn => btn.textContent?.trim()  === "Stop Scanning" )
            
            if(stopScanningButton) {
                stopScanningButton.textContent = "Parar Câmera";
                stopScanningButton.classList.add("stop-button")
            }

            const startScanningButton = Array.from(buttons).find(btn => btn.textContent?.trim() === "Start Scanning");

            if (startScanningButton) {
                startScanningButton.textContent = "Começar a escanear";
                startScanningButton.classList.add("start-button");
            }
        };

        updateTexts(); // Executa a função ao montar o componente

        const observer = new MutationObserver(() => { // para garantir que a API não modifique os textos novamente
            updateTexts();
        });

        observer.observe(document.body, { childList: true, subtree: true });

        return () => observer.disconnect();
    }, []);

    return null;
}

export default ScannerComponent;
