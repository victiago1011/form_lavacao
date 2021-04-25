const express = require('express');
const cors = require('cors');

const app = express();
const port = 7000;
const hostname = '0.0.0.0';
const usuarioRouter = require('./routes/usuarios');

app.use(cors());
app.use(express.json());
app.use('/usuarios', usuarioRouter);

app.listen(port, hostname, () => {
    console.log(`Servidor rodando na porta: ${port}`);
});