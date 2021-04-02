/*
    Ruta: /api/usuarios
*/
const { Router } = require('express');
const { getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario } = require('../controllers/usuarios');
const router = Router();
const { check } = require('express-validator');
const { validaCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

router.get("/", validarJWT, getUsuarios);

router.post("/", [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatoria').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    validaCampos
], crearUsuario);

router.put("/:id", [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').not().isEmpty(),
    check('role', 'El rol es obligatorio').not().isEmpty(),
    validaCampos
], actualizarUsuario);

router.delete("/:id", validarJWT, borrarUsuario);

module.exports = router;