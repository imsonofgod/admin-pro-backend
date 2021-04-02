const { response } = require('express');
const { validationResult } = require('express-validator');

const validaCampos = (req, res = response, next) => {
    //captura todos los errores generados en als rutas 
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errores.mapped()
        });
    }

    next();
}

module.exports = {
    validaCampos
}