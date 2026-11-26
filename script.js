
// Array que armazena os torcedores
let torcedores = [];

// Capturando os elementos HTML
const formulario = document.getElementById("formTorcedor");
const lista = document.getElementById("listaTorcedores");
const mensagem = document.getElementById("mensagem");

// Evento de cadastro
formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();

    // Validação dos campos
    if (nome.length < 3 || !emailValido(email)) {
        mensagem.textContent = "Preencha os campos corretamente!";
        mensagem.style.color = "red";
        return;
    }

    // Criando objeto do torcedor
    const torcedor = {
        id: Date.now(),
        nome: nome,
        email: email
    };

    // Adicionando ao array
    torcedores.push(torcedor);

    // Atualizando a tela
    mostrarTorcedores();

    mensagem.textContent = "Torcedor cadastrado com sucesso! 🖤";
    mensagem.style.color = "green";

    formulario.reset();
});

// Função para validar o e-mail
function emailValido(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Função para mostrar os torcedores
function mostrarTorcedores() {

    lista.innerHTML = "";

    if (torcedores.length === 0) {
        lista.innerHTML = `
            <p class="text-white text-center">
                Nenhum torcedor cadastrado ainda.
            </p>
        `;
        return;
    }

    torcedores.forEach(function(torcedor) {

        const item = document.createElement("div");

        item.className = "torcedor";

        const informacoes = document.createElement("div");

        const nome = document.createElement("strong");
        nome.textContent = torcedor.nome;

        const email = document.createElement("p");
        email.textContent = torcedor.email;
        email.className = "mb-0";

        informacoes.appendChild(nome);
        informacoes.appendChild(email);

        const botao = document.createElement("button");

        botao.textContent = "Remover";
        botao.className = "btn btn-danger btn-sm";

        botao.addEventListener("click", function() {
            removerTorcedor(torcedor.id);
        });

        item.appendChild(informacoes);
        item.appendChild(botao);

        lista.appendChild(item);
    });
}

// Função para remover torcedor
function removerTorcedor(id) {

    torcedores = torcedores.filter(function(torcedor) {
        return torcedor.id !== id;
    });

    mostrarTorcedores();

    mensagem.textContent = "Torcedor removido!";
    mensagem.style.color = "orange";
}

// Mensagem inicial
mostrarTorcedores();
