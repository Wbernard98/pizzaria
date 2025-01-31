document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("pizzaform");
    const tamanho = document.getElementById("tamanho");
    const sabores = document.querySelectorAll("input[name='sabores']");
    const adicionais = document.querySelectorAll("input[name='adicionais']");
    const bordas = document.querySelectorAll("input[name='borda']"); // Agora são radios
    const precoDisplay = document.getElementById("preco");

    // Preços base por tamanho
    const precos = {
        pequena: 30,
        media: 40,
        Grande: 50
    };

    function atualizarPreco() {
        let preco = precos[tamanho.value] || 0;

        // Conta sabores selecionados
        let saboresSelecionados = [...sabores].filter(sabor => sabor.checked).length;
        preco += saboresSelecionados * 3;

        // Conta adicionais selecionados
        let adicionaisSelecionados = [...adicionais].filter(adicional => adicional.checked).length;
        preco += adicionaisSelecionados * 2;

        // Adiciona valor da borda recheada se houver seleção
        let bordaSelecionada = [...bordas].find(borda => borda.checked);
        if (bordaSelecionada) {
            preco += 5; // Cada borda custa R$5
        }

        precoDisplay.textContent = preco.toFixed(2);
    }

    // Limita a seleção de até 4 sabores
    sabores.forEach(sabor => {
        sabor.addEventListener("change", function () {
            let selecionados = [...sabores].filter(sabor => sabor.checked);
            if (selecionados.length > 4) {
                this.checked = false;
                alert("Você só pode escolher até 4 sabores!");
            }
            atualizarPreco();
        });
    });

    // Atualiza preço ao trocar tamanho, adicionais ou borda
    tamanho.addEventListener("change", atualizarPreco);
    adicionais.forEach(adicional => adicional.addEventListener("change", atualizarPreco));
    bordas.forEach(borda => borda.addEventListener("change", atualizarPreco));

    // Atualiza preço inicial
    atualizarPreco();
});
