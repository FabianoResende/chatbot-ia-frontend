function exibirMensagemNaTela(texto, remetente) {
    const chatOutput = document.getElementById("chat-output");
    const novaMensagem = document.createElement("div");
    novaMensagem.className = `message ${remetente}`;
    novaMensagem.innerText = texto;
    chatOutput.appendChild(novaMensagem);
    chatOutput.scrollTop = chatOutput.scrollHeight; // Rola para o final automaticamente
}

function verificarEnter(event) {
    if (event.key === "Enter") {
        enviarMensagem();
    }
}

async function enviarMensagem() {
    const inputTexto = document.getElementById("input-texto");
    const inputDeTexto = inputTexto.value.trim();

    if (!inputDeTexto) return;

    // 1. Mostra a mensagem do usuário na tela
    exibirMensagemNaTela(inputDeTexto, "user");
    inputTexto.value = ""; // Limpa o campo de entrada

    try {
        // 2. Faz a chamada para o backend no Render
        const response = await fetch("https://chatbot-croq-backend.onrender.com/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ prompt: inputDeTexto })
        });

        const data = await response.json();

        // 3. Exibe a resposta da IA vinda do servidor
        exibirMensagemNaTela(data.answer, "bot");

    } catch (error) {
        console.error("Erro ao conversar com o backend:", error);
        exibirMensagemNaTela("Erro ao conectar com a IA. Verifique sua internet.", "bot");
    }
}
