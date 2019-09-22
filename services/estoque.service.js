var config = require('config.json');
var mongodb = require('mongodb');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, { native_parser: true });
db.bind('estoque');

var service = {};

service.salvar = salvar;
service.consultar = consultar;
service.deletar = deletar;

module.exports = service;

function salvar(roupa) {
    var deferred = Q.defer();

    var query = {
        codigo: roupa.codigo
    }

    delete roupa._id;

    db.estoque.findOneAndUpdate(
        query,
        roupa,
        {upsert: true},
        function (err, doc) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            deferred.resolve();
    });

    return deferred.promise;
}

function consultar(userId) {
    var deferred = Q.defer();
    var query = {
        userId: userId
    };

    db.estoque.find(query).toArray(function (err, doc)
    {        
        if (err) deferred.reject(err.name + ': ' + err.message);
        deferred.resolve(doc);
    });

    return deferred.promise;
}

function deletar(roupaId) {
    var deferred = Q.defer();
    let query = {
        _id: new mongodb.ObjectID(roupaId)
    };
    db.estoque.deleteOne(
        query,
        function (err, doc) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            deferred.resolve();
    });

    return deferred.promise;
}