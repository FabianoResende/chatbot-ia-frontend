function exibirMensagemNaTela(texto, remetente) {
    const chatOutput = document.getElementById("chat-output");
    const novaMensagem = document.createElement("div");

    novaMensagem.className = `message message_${remetente}`;
    novaMensagem.textContent = texto;

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
    const texto = inputTexto.value.trim();

    if (!texto) return;

    // Exibe mensagem do usuário
    exibirMensagemNaTela(texto, "user");
    inputTexto.value = "";

    // Feedback visual enquanto espera resposta
    exibirMensagemNaTela("...", "bot");

    try {
        const response = await fetch("https://chatbot-ia-backend-wy5l.onrender.com/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: texto })
        });

        const data = await response.json();

        // Remove o "..."
        const chatOutput = document.getElementById("chat-output");
        chatOutput.lastChild.remove();

        exibirMensagemNaTela(data.answer || "Sem resposta da IA no momento.", "bot");

    } catch (error) {
        console.error("Erro ao conversar com o backend:", error);
        const chatOutput = document.getElementById("chat-output");
        chatOutput.lastChild.remove();

        exibirMensagemNaTela("Erro ao conectar com a IA.", "bot");
    }
}
 
