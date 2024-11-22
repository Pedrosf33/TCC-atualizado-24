let currentQuestion = 1; // Começa na primeira pergunta
let respostas = []; // Armazena as respostas do usuário

// Função para iniciar o quiz
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

    // Contadores para sintomas
    let sintomas = {
        estresse: 0,
        ansiedade: 0,
        depressao: 0,
        saude: 0
    };

    // Análise baseada nas respostas
    respostas.forEach((resposta, index) => {
        // Cenário 1: Estresse no Trabalho
        if (index === 0) {
            if (resposta === 'A') sintomas.saude++;  // Está bem
            if (resposta === 'B') sintomas.estresse++;  // Pode estar estressado
            if (resposta === 'C') sintomas.saude++;  // Está bem
            if (resposta === 'D') sintomas.depressao++;  // Pode estar com depressão
        }
        // Cenário 2: Relacionamentos Pessoais
        if (index === 1) {
            if (resposta === 'A') sintomas.ansiedade++;  // Ansiedade
            if (resposta === 'B') sintomas.saude++;  // Está bem
            if (resposta === 'C') sintomas.depressao++;  // Depressão
            if (resposta === 'D') sintomas.ansiedade++;  // Ansiedade
        }
        // Cenário 3: Autocuidado
        if (index === 2) {
            if (resposta === 'A') sintomas.saude++;  // Está cuidando da saúde
            if (resposta === 'B') sintomas.depressao++;  // Depressão e desânimo
            if (resposta === 'C') sintomas.depressao++;  // Pode estar com depressão
            if (resposta === 'D') sintomas.saude++;  // Está cuidando da saúde
        }
        // Cenário 4: Mudança de Vida
        if (index === 3) {
            if (resposta === 'A') sintomas.saude++;  // Está bem
            if (resposta === 'B') sintomas.ansiedade++;  // Ansiedade
            if (resposta === 'C') sintomas.depressao++;  // Pode estar com depressão
            if (resposta === 'D') sintomas.saude++;  // Está bem
        }
        // Cenário 5: Sentimentos de Tristeza
        if (index === 4) {
            if (resposta === 'A') sintomas.saude++;  // Faz certo
            if (resposta === 'B') sintomas.depressao++;  // Talvez depressão
            if (resposta === 'C') sintomas.depressao++;  // Depressão
            if (resposta === 'D') sintomas.saude++;  // Está cuidando da saúde
        }
    });

    // Geração do laudo
    let laudo = "<strong>Seu laudo:</strong><br><br>";

    // Diagnóstico baseado nos sintomas
    if (sintomas.depressao >= 3) {
        laudo += "Você apresenta sinais de depressão. Sentimentos persistentes de tristeza e desmotivação merecem atenção. Buscar ajuda profissional é altamente recomendado.<br>";
    } else if (sintomas.depressao === 2) {
        laudo += "Você apresenta alguns sintomas de depressão. É importante buscar maneiras de lidar com esses sentimentos e, se necessário, procurar ajuda.<br>";
    } else if (sintomas.ansiedade >= 3) {
        laudo += "Você está apresentando sinais de ansiedade. A preocupação excessiva pode estar afetando seu bem-estar. Tente práticas de relaxamento e, se necessário, procure apoio profissional.<br>";
    } else if (sintomas.ansiedade === 2) {
        laudo += "Você apresenta alguns sintomas leves de ansiedade. Técnicas de respiração e mindfulness podem ajudar a aliviar a ansiedade.<br>";
    } else if (sintomas.estresse >= 3) {
        laudo += "Você está passando por altos níveis de estresse. Procure maneiras de relaxar e estabelecer limites para não se sobrecarregar. Praticar atividades relaxantes pode ser útil.<br>";
    } else if (sintomas.estresse === 2) {
        laudo += "Você está com alguns sintomas de estresse. Tente organizar melhor sua rotina e incluir momentos de descanso para evitar sobrecarga.<br>";
    } else if (sintomas.saude >= 3) {
        laudo += "Você parece estar cuidando bem da sua saúde mental! Continue praticando atividades que ajudam a reduzir o estresse e a manter o equilíbrio.<br>";
    } else {
        laudo += "Você não apresenta sinais significativos de ansiedade, depressão ou estresse. Continue cuidando bem da sua saúde mental!<br>";
    }

    // Exibindo o laudo
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
