var config = require('config.json');
var express = require('express');
var router = express.Router();
var estoqueService = require('services/estoque.service');

// routes
router.post('/salvar', salvaRoupa);
router.get('/consultar/:userId', consultaRoupas);
router.delete('/deletar/:id', deletaRoupa);
//router.get('/:_id', getCurrentUser);
//router.put('/:_id', updateUser);
//router.delete('/:_id', deleteUser);

module.exports = router;

function salvaRoupa(req, res) {
    estoqueService.salvar(req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function consultaRoupas(req, res) {
    estoqueService.consultar(req.params.userId)
        .then(function (roupas) {
            res.status(200).send(roupas);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function deletaRoupa(req, res) {
    estoqueService.deletar(req.params.id)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}