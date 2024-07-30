async function buscarPerfil() {
    const usuario = document.getElementById('usuario').value.trim();
    const resultadoDiv = document.getElementById('resultado');
    const erroDiv = document.getElementById('erro');

    // Limpa resultados anteriores e erros
    resultadoDiv.innerHTML = '';
    erroDiv.textContent = '';

    if (!usuario) {
        erroDiv.textContent = 'Por favor, insira um nome de usuário.';
        return;
    }

    try {
        const resposta = await fetch(`https://api.github.com/users/${usuario}`);
        if (!resposta.ok) {
            throw new Error('Usuário não encontrado ou erro na requisição.');
        }
        const dados = await resposta.json();

        // Exibe os dados do perfil
        resultadoDiv.innerHTML = `
            <img src="${dados.avatar_url}" alt="${dados.login}">
            <h2>${dados.name || dados.login}</h2>
            <p>${dados.bio || 'Sem biografia disponível.'}</p>
        `;
    } catch (erro) {
        erroDiv.textContent = erro.message;
    }
}

// Permite buscar ao pressionar Enter
document.getElementById('usuario').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        buscarPerfil();
    }
});