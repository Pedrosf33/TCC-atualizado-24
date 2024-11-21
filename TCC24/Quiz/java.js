let currentQuestion = 1; // Começa na primeira pergunta
let respostas = []; // Armazena as respostas do usuário

// Inicia o quiz
function iniciarQuiz() {
    document.getElementById('inicio').style.display = 'none'; // Esconde a tela inicial
    document.getElementById('quiz').style.display = 'block';  // Exibe a tela do quiz
    mostrarPergunta(currentQuestion); // Exibe a primeira pergunta
}

// Função para mostrar a pergunta atual
function mostrarPergunta(pergunta) {
    const perguntas = document.querySelectorAll('.pergunta');
    perguntas.forEach(pergunta => {
        pergunta.style.display = 'none'; // Esconde todas as perguntas
    });

    const perguntaAtual = document.getElementById(`pergunta${pergunta}`);
    if (perguntaAtual) {
        perguntaAtual.style.display = 'block'; // Exibe a pergunta atual
    }
}

// Função para avançar para a próxima pergunta
function avancarPergunta(proximaPergunta) {
    const respostaSelecionada = document.querySelector(`input[name="pergunta${currentQuestion}"]:checked`);
    if (!respostaSelecionada) {
        alert('Por favor, escolha uma opção antes de continuar.');
        return;
    }

    respostas.push(respostaSelecionada.value); // Armazena a resposta
    currentQuestion = proximaPergunta; // Atualiza a pergunta atual

    if (currentQuestion <= 5) {
        mostrarPergunta(currentQuestion); // Mostra a próxima pergunta
    } else {
        finalizarQuiz(); // Finaliza o quiz
    }
}

// Função para finalizar o quiz
function finalizarQuiz() {
    document.getElementById('quiz').style.display = 'none'; // Esconde as perguntas

    // Análise personalizada
    let resultados = {
        depressao: 0,
        ansiedade: 0,
        estresse: 0,
    };

    respostas.forEach((resposta, index) => {
        // Atribuir pesos às respostas com base nos sintomas
        if (index === 0) { // Cenário 1
            if (resposta === 'B') resultados.estresse++;
            if (resposta === 'C') resultados.depressao++;
            if (resposta === 'D') resultados.ansiedade++;
        }
        if (index === 1) { // Cenário 2
            if (resposta === 'C') resultados.depressao++;
            if (resposta === 'A') resultados.ansiedade++;
        }
        if (index === 2) { // Cenário 3
            if (resposta === 'B' || resposta === 'C') resultados.estresse++;
            if (resposta === 'D') resultados.ansiedade++;
        }
        if (index === 3) { // Cenário 4
            if (resposta === 'B') resultados.ansiedade++;
            if (resposta === 'C') resultados.depressao++;
        }
        if (index === 4) { // Cenário 5
            if (resposta === 'C') resultados.depressao++;
            if (resposta === 'A') resultados.ansiedade++;
        }
    });

    // Gera sugestões específicas
    let sugestoes = [];
    if (resultados.depressao > 2) {
        sugestoes.push(
            "Considere procurar apoio psicológico. A terapia é uma ferramenta poderosa para lidar com sentimentos persistentes de tristeza e desmotivação."
        );
    }
    if (resultados.ansiedade > 2) {
        sugestoes.push(
            "Pratique técnicas de relaxamento, como meditação ou exercícios de respiração. Isso pode ajudar a reduzir a preocupação excessiva."
        );
    }
    if (resultados.estresse > 2) {
        sugestoes.push(
            "Estabeleça limites no trabalho e encontre tempo para atividades relaxantes. O equilíbrio é fundamental para evitar o esgotamento."
        );
    }

    // Caso não haja problemas graves
    if (sugestoes.length === 0) {
        sugestoes.push("Parabéns por estar cuidando bem da sua saúde mental! Continue assim e não hesite em buscar ajuda caso precise no futuro.");
    }

    // Monta o laudo final
    let laudo = `<strong>Resumo dos seus resultados:</strong><br>`;
    if (resultados.depressao > 2) laudo += "- Possíveis sinais de depressão detectados.<br>";
    if (resultados.ansiedade > 2) laudo += "- Possíveis sinais de ansiedade detectados.<br>";
    if (resultados.estresse > 2) laudo += "- Possíveis sinais de estresse detectados.<br>";

    laudo += `<br><strong>Sugestões:</strong><ul>`;
    sugestoes.forEach(sugestao => {
        laudo += `<li>${sugestao}</li>`;
    });
    laudo += `</ul>`;

    // Exibe o resultado
    document.getElementById('resultadoTexto').innerHTML = laudo;
    document.getElementById('resultado').style.display = 'block';
}

// Função para reiniciar o quiz
function reiniciarQuiz() {
    currentQuestion = 1; // Reseta a pergunta atual para a primeira
    respostas = []; // Limpa as respostas anteriores

    // Oculta todas as perguntas
    const perguntas = document.querySelectorAll('.pergunta');
    perguntas.forEach(pergunta => {
        pergunta.style.display = 'none';
    });

    // Volta para a tela inicial
    document.getElementById('resultado').style.display = 'none';
    document.getElementById('inicio').style.display = 'block';
}
