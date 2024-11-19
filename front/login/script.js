
const buttons = document.querySelectorAll('.key-button');
const form = document.querySelector('#password-form');
const realPasswordInput = document.querySelector('#real-password');
const asteriskPasswordInput = document.querySelector('#asterisk-password');
const clearButton = document.querySelector('#clear');
const submitButton = document.querySelector('#submit')

buttons.forEach((button) => {
    button.addEventListener('click', () => {
        const value = button.innerHTML;
        if (value !== 'C' && value !== '↵') {
            realPasswordInput.value += value;  // Adiciona o número real à senha
            asteriskPasswordInput.value += '*'; // Adiciona um asterisco ao campo visível
        }
    });
});

clearButton.addEventListener('click', () => {
    realPasswordInput.value = '';
    asteriskPasswordInput.value = '';
});

submitButton.addEventListener('click', () => {
    const password = realPasswordInput.value; // Usa a senha real
    fetch('http://localhost:3000/usuario')
        .then(response => response.json())
        .then(data => {
            const user = data.find((user) => user.senha === password);
            if (user) {
                window.localStorage.setItem('user', JSON.stringify(user));
                window.location.href = '../home/index.html';
            } else {
                alert('Senha Incorreta');
            }
            
        });
});
