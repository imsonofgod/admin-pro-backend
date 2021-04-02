const { response } = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const login = async(req, res = response) => {
    const { email, password } = req.body;

    try {
        const usuarioBD = await Usuario.findOne({ email });

        //verificar email 
        if (!usuarioBD) {
            return res.status(400).json({
                ok: true,
                msg: 'Email no encontrado'
            });
        }
        //verificar contraseña
        const validPassword = bcrypt.compareSync(password, usuarioBD.password);
        if (!validPassword) {
            return res.status(400).json();
        }
        //Generar el TOKEN - JWT
        const token = await generarJWT(usuarioBD.id);

        res.json({
            ok: true,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

module.exports = {
    login
}