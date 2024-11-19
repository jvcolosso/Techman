const express = require('express');

const comentarios = require('./controllers/comentarios');
const equipamentos = require('./controllers/equipamentos');
const usuarios = require('./controllers/usuarios');
const perfis = require('./controllers/perfis');

const router = express.Router();

router.get('/comentario', comentarios.read);
router.get('/comentario/:id', comentarios.readbyequip);
router.post('/comentario', comentarios.create);
router.put('/comentario/:id/:perfil', comentarios.update);
router.patch('/comentario/:id/:perfil', comentarios.update);
router.delete('/comentario/:id', comentarios.del);

router.get('/equipamento', equipamentos.read);
router.post('/equipamento', equipamentos.create);
router.put('/equipamento/:id', equipamentos.update);
router.delete('/equipamento/:id', equipamentos.del);

router.get('/perfis', perfis.read);
router.post('/perfis', perfis.create);
router.put('/perfis/:id', perfis.update);
router.delete('/perfis/:id', perfis.del);

router.get('/usuario', usuarios.read);
router.post('/usuario', usuarios.create);
router.post('/usuario/login', usuarios.login);
router.put('/usuario/:id', usuarios.update);
router.delete('/usuario/:id', usuarios.del);

module.exports = router;
