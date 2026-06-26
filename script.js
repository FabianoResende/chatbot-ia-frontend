// Substitua o trecho de envio antigo no seu script.js por este bloco corrigido:
try {
    const response = await fetch('https://chatbot-gemini-backend-m8a1.onrender.com/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt: inputDeTexto }) // Envia a variável com o texto do usuário para o Render
    });

    const data = await response.json();
    
    // Adiciona a resposta estruturada vinda do seu servidor na tela do chat
    exibirMensagemNaTela(data.answer, 'bot'); 
    
} catch (error) {
    console.error("Erro ao conversar com o backend:", error);
    exibirMensagemNaTela("Erro ao conectar com a IA. Verifique sua internet.", 'bot');
}