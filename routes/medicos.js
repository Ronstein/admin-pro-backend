/*
    Medicos
    Path: '/api/medicos'
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
} = require('../controllers/medicos');

const router = Router();


router.get('/', getMedicos);

router.post('/',
    [
        validarJWT,
        check('nombre', 'El nombre del medico es obligatorio').not().isEmpty(),
        check('hospital', 'El id del hospital debe ser valido').isMongoId(),
        validarCampos
    ],
    crearMedico
);

router.put('/:id',
    [
        validarJWT,
        check('nombre', 'El nombre del medico es obligatorio').not().isEmpty(),
        check('hospital', 'El id del hospital debe ser valido').isMongoId(),
        validarCampos
    ]
    , actualizarMedico);

router.delete('/:id',
    borrarMedico,
);

module.exports = router;