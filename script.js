

const formulario = document.getElementById("formTorcedor");
const lista = document.getElementById("listaTorcedores");
const mensagem = document.getElementById("mensagem");
const contador = document.getElementById("contador");


let torcedores = [];


function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}


function exibirMensagem(texto, tipo) {
    mensagem.textContent = texto;

    mensagem.style.color =
        tipo === "sucesso" ? "#55cf83" : "#ff5555";
}


formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();

   
    if (nome.length < 3) {
        exibirMensagem("Digite um nome com pelo menos 3 caracteres.", "erro");
        return;
    }

  
    if (!validarEmail(email)) {
        exibirMensagem("Digite um e-mail válido.", "erro");
        return;
    }

    
    const duplicado = torcedores.some(function(torcedor) {
        return torcedor.email.toLowerCase() === email.toLowerCase();
    });

    if (duplicado) {
        exibirMensagem("Este e-mail já está cadastrado.", "erro");
        return;
    }

   
    const novoTorcedor = {
        id: Date.now(),
        nome: nome,
        email: email
    };

    
    torcedores.push(novoTorcedor);

 
    mostrarTorcedores();

   
    exibirMensagem("Cadastro realizado com sucesso!", "sucesso");

   
    formulario.reset();
});


function mostrarTorcedores() {

    lista.innerHTML = "";

    contador.textContent =
        `${torcedores.length} TORCEDOR(ES)`;

    if (torcedores.length === 0) {

        const vazio = document.createElement("p");
        vazio.className = "empty";
        vazio.textContent = "Ainda não há torcedores cadastrados.";

        lista.appendChild(vazio);
        return;
    }

    torcedores.forEach(function(torcedor) {

        const item = document.createElement("div");
        item.className = "torcedor-item";

        const informacoes = document.createElement("div");

        const nome = document.createElement("strong");
        nome.textContent = torcedor.nome;

        const email = document.createElement("p");
        email.textContent = torcedor.email;

        informacoes.appendChild(nome);
        informacoes.appendChild(email);

        const botao = document.createElement("button");
        botao.className = "remove-btn";
        botao.textContent = "REMOVER";

        botao.addEventListener("click", function() {
            removerTorcedor(torcedor.id);
        });

        item.appendChild(informacoes);
        item.appendChild(botao);

        lista.appendChild(item);
    });
}


function removerTorcedor(id) {

    torcedores = torcedores.filter(function(torcedor) {
        return torcedor.id !== id;
    });

    mostrarTorcedores();

    exibirMensagem("Torcedor removido com sucesso!", "sucesso");
}


mostrarTorcedores();
