/*
    Path: '/api/login'
*/

const { Router } = require("express");
const { login } = require("../controllers/auth");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

router.post('/',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'La contraseña es obligatoria').not().isEmpty(),
        check('password', 'La contraseña debe tener minimo 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ],
    login
)

module.exports = router;