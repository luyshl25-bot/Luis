let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

function salvarCarrinho() {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

function atualizarContadorCarrinho() {
    const linkCarrinho = document.getElementById("link-carrinho");

    if (linkCarrinho) {
        linkCarrinho.textContent = "Meu Carrinho (" + carrinho.length + ")";
    }
}

function adicionarAoCarrinho(nome, preco) {
    carrinho.push({
        nome: nome,
        preco: preco
    });

    salvarCarrinho();
    atualizarContadorCarrinho();

    alert(nome + " foi adicionado ao carrinho!");
}

function removerItem(index) {
    carrinho.splice(index, 1);
    salvarCarrinho();
    carregarCarrinho();
    atualizarContadorCarrinho();
}

function calcularTotal() {
    return carrinho.reduce(function(total, item) {
        return total + item.preco;
    }, 0);
}

function carregarCarrinho() {
    const listaCarrinho = document.getElementById("lista-carrinho");
    const totalCarrinho = document.getElementById("total-carrinho");

    if (!listaCarrinho || !totalCarrinho) {
        return;
    }

    listaCarrinho.innerHTML = "";

    if (carrinho.length === 0) {
        listaCarrinho.innerHTML = "<p>Seu carrinho está vazio.</p>";
        totalCarrinho.textContent = "Total: R$ 0,00";
        return;
    }

    carrinho.forEach(function(item, index) {
        const div = document.createElement("div");
        div.className = "produto-card";

        div.innerHTML = `
            <h3 class="produto-nome">${item.nome}</h3>
            <p class="produto-preco">R$ ${item.preco.toFixed(2).replace(".", ",")}</p>
            <button type="button" class="botao-comprar botao-remover" data-index="${index}">
                Remover
            </button>
        `;

        listaCarrinho.appendChild(div);

        div.querySelector(".botao-remover").addEventListener("click", function() {
            removerItem(index);
        });
    });

    totalCarrinho.textContent = "Total: R$ " + calcularTotal().toFixed(2).replace(".", ",");
}

function finalizarWhatsApp() {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio.");
        return;
    }

    let mensagem = "Olá! Gostaria de finalizar minha compra:%0A%0A";

    carrinho.forEach(function(item, index) {
        mensagem += (index + 1) + ". " + item.nome + " - R$ " + item.preco.toFixed(2).replace(".", ",") + "%0A";
    });

    mensagem += "%0ATotal: R$ " + calcularTotal().toFixed(2).replace(".", ",");

    window.location.href = "https://wa.me/5511999999999?text=" + mensagem;
}

document.addEventListener("DOMContentLoaded", function() {
    atualizarContadorCarrinho();
    carregarCarrinho();

    const botoesComprar = document.querySelectorAll(".botao-comprar[data-nome][data-preco]");

    botoesComprar.forEach(function(botao) {
        botao.addEventListener("click", function() {
            const nome = botao.getAttribute("data-nome");
            const preco = parseFloat(botao.getAttribute("data-preco"));

            adicionarAoCarrinho(nome, preco);
        });
    });

    const botaoFinalizar = document.getElementById("finalizar-whatsapp");

    if (botaoFinalizar) {
        botaoFinalizar.addEventListener("click", finalizarWhatsApp);
    }
});
