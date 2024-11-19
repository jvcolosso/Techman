const express = require('express');
const cors = require('cors');
const app = express();
const routes = require('./src/routes');

app.use(cors());

app.use(express.json());

app.use(routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const routes = require('./src/routes'); // Supondo que seu arquivo de rotas está exportando todas as rotas

// const app = express();
// const PORT = process.env.PORT || 3000;


// app.use(cors());


// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// // Rotas do sistema
// app.use('/api', routes); 

// // Tratamento de erro para rotas não encontradas
// app.use((req, res, next) => {
//     res.status(404).json({ message: 'Rota não encontrada' });
// });

// // Tratamento de erros gerais
// app.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).json({ message: 'Erro no servidor' });
// });

// // Iniciar o servidor
// app.listen(PORT, () => {
//     console.log(`Servidor rodando na porta ${PORT}`);
// });
