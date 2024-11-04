const { response } = require("express");
const Hospital = require("../models/hospital");

const getHospitales = async (req, res = response) => {

    const desde = Number(req.query.desde) || 0;
    const limite = Number(req.query.limite) || 0;

    // const hospitales = await Hospital.find()
    //     .populate('usuario', 'nombre img')
    //     .skip(desde)
    //     .limit(limite);

    // const [hospitales, total] = await Promise.all([
    //     Hospital.find()
    //         .populate('usuario', 'nombre img')
    //         .skip(desde)
    //         .limit(limite),
    //     Hospital.countDocuments()
    // ]);

    // Crea una consulta base y ajusta según el valor de `limite`
    const hospitalesQuery = Hospital.find().populate('usuario', 'nombre img').skip(desde);

    if (limite > 0) {
        hospitalesQuery.limit(limite);
    }

    const [hospitales, total] = await Promise.all([
        hospitalesQuery,
        Hospital.countDocuments()
    ]);

    res.json({
        ok: true,
        hospitales,
        total
    })
}

const crearHospital = async (req, res = response) => {

    const uid = req.uid;
    const hospital = new Hospital({
        usuario: uid, ...req.body
    });


    try {

        const hospitalDB = await hospital.save();

        res.json({
            ok: true,
            hospital: hospitalDB,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }

}
const actualizarHospital = async (req, res = response) => {
    const id = req.params.id;
    const uid = req.uid;
    try {
        const hospitalDB = await Hospital.findById(id);
        if (!hospitalDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Hospital no encontrado'
            })
        }

        const cambiosHospital = {
            ...req.body,
            usuario: uid
        }
        const hospitalActualizado = await Hospital.findByIdAndUpdate(id, cambiosHospital, { new: true });

        res.json({
            ok: true,
            hospital: hospitalActualizado
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
}
const borrarHospital = async (req, res = response) => {
    const id = req.params.id;

    try {
        const hospitalDB = await Hospital.findById(id);
        if (!hospitalDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Hospital no encontrado'
            })
        }

        await Hospital.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Hospital eliminado',
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
}

module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}