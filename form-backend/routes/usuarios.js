const router = require('express').Router();
const { check, body, validationResult } = require('express-validator');

router.post('/', [//esta barra é do arquivo server app.use /usuarios
    check('nome', 'Nome é campo obrigatório.').trim().escape().notEmpty(),
    check('telefone').trim().escape(),
    check('whatsApp').trim().escape(),
    check('marca', 'Marca é um campo obrigatório.').trim().escape().notEmpty(),
    check('modelo', 'Modelo é um campo obrigatório.').trim().escape().notEmpty(),
    check('ano').trim().escape(),
    check('placa', 'Placa é um campo obrigatório.').trim().escape().notEmpty(),
    check('dia', 'Data é um campo obrigatório.').trim().escape().notEmpty().bail().custom(value => {
        var data = new Date(value);
        data.setDate(data.getDate() +1);
        var atualData = new Date();
        if(data < atualData){
            return false
        }
        return true 
    }).withMessage("Data escolhida não pode ser menor que a data atual!").bail().custom(value => {
        var data = new Date(value);
        data.setDate(data.getDate() +1);
        var diaSemana = data.getDay();
        if(diaSemana !=0 && diaSemana != 6){
            return true
        }
    }).withMessage("Desculpe, não trabalhamos Sábados e Domingos, favor escolher outra data."),
    check('horario', 'Horário é um campo obrigatório.').trim().escape().notEmpty(),
    check('minutos', 'Minutos é um campo obrigatório.').trim().escape().notEmpty().bail().custom(value => {
        if(value == 0 || value == 30){
            return true
        }
        return false
    }).withMessage("Digite zero (0) ou trinta(30) minutos"),

], (req, res) => {
    const erros = validationResult(req);

    const usuario = req.body;
    
    const contexto = {
        usuario: usuario,
        erros: erros.array()
    };

    if(!erros.isEmpty()){
        return res.status(422).json(contexto);
    }else{
        return res.status(200).json(contexto);
    }
});

module.exports = router;