const form = document.querySelector('.form');
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const status = form.ativo.checked ? 'ativo' : form.inativo.checked ? 'inativo' : 'indefinido';

    const equipamento = {
        nome: form.nome.value,
        imagem: form.imagem.value,
        descricao: form.descricao.value,
        status: status,
    };

    console.log(equipamento);

    try {
        const response = await fetch('http://localhost:3000/equipamento', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(equipamento)
        });

        if (!response.ok) {
            throw new Error(`Erro: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();

        window.location.href = '../home/index.html';
        console.log(data);
    } catch (error) {
        console.error("Erro ao enviar o equipamento:", error);
    }
});