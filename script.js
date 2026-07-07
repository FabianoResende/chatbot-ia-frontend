function exibirMensagemNaTela(texto, remetente) {
    const chatOutput = document.getElementById("chat-output");
    const novaMensagem = document.createElement("div");
    novaMensagem.className = `message ${remetente}`;
    novaMensagem.innerText = texto;
    chatOutput.appendChild(novaMensagem);
    chatOutput.scrollTop = chatOutput.scrollHeight;
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

    exibirMensagemNaTela(inputDeTexto, "user");
    inputTexto.value = "";

    try {
        const response = await fetch("https://chatbot-ia-backend-my5l.onrender.com/chat", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ prompt: message })
});

        const data = await response.json();

        exibirMensagemNaTela(data.answer, "bot");

    } catch (error) {
        console.error("Erro ao conversar com o backend:", error);
        exibirMensagemNaTela("Erro ao conectar com a IA. Verifique sua internet.", "bot");
    }
}
