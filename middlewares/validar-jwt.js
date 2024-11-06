const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');


const validarJWT = (req, res, next) => {

    const token = req.header('x-token');
    //console.log(token);
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la peticion'
        })
    }
    try {
        const { uid, name } = jwt.verify(token, process.env.SECRET_JWT_SEED);
        //console.log({ uid, name });
        req.uid = uid;
        req.name = name;

        next();
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        });
    }
}

const validarADMIN_ROLE = async (req, res, next) => {
    const uid = req.uid;

    try {
        const usuarioDB = await Usuario.findById(uid);
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no Existe'
            });
        }

        if (usuarioDB.role !== 'ADMIN_ROLE') {
            return res.status(403).json({
                ok: false,
                msg: 'Permisos Insuficientes'
            });
        }

        next();

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador'
        });
    }
}

const validarADMIN_ROLE_o_MismoUsuario = async (req, res, next) => {
    const uid = req.uid;
    const id = req.params.id;

    try {
        const usuarioDB = await Usuario.findById(uid);
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no Existe'
            });
        }

        if (usuarioDB.role === 'ADMIN_ROLE' || uid === id) {
            next();
        } else {
            return res.status(403).json({
                ok: false,
                msg: 'Permisos Insuficientes'
            });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador'
        });
    }
}

module.exports = {
    validarJWT,
    validarADMIN_ROLE,
    validarADMIN_ROLE_o_MismoUsuario
}