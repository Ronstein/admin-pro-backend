const { response } = require("express")
const Medico = require("../models/medico");


const getMedicos = async (req, res = response) => {

    const desde = Number(req.query.desde) || 0;
    const limite = Number(req.query.desde) || 5;

    // const medicos = await Medico.find()
    //     .populate('usuario', 'nombre img')
    //     .populate('hospital', 'nombre img')
    //     .skip(desde)
    //     .limit(limite);

    const [medicos, total] = await Promise.all([
        Medico.find()
            .populate('usuario', 'nombre img')
            .populate('hospital', 'nombre img')
            .skip(desde)
            .limit(limite),
        Medico.countDocuments(),
    ]);

    res.json({
        ok: true,
        medicos,
        total
    })
}

const getMedicoById = async (req, res = response) => {
    const id = req.params.id;
    try {
        const medico = await Medico.findById(id)
            .populate('usuario', 'nombre img')
            .populate('hospital', 'nombre img');

        if (!medico) {
            return res.status(404).json({
                ok: false,
                msg: 'Médico no encontrado'
            });
        }

        res.json({
            ok: true,
            medico,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
}

const crearMedico = async (req, res = response) => {
    const uid = req.uid;
    //console.log(req.body);
    const medico = new Medico({
        usuario: uid, ...req.body
    });

    try {
        const medicoDB = await medico.save();
        res.json({
            ok: true,
            medico: medicoDB
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }



}
const actualizarMedico = async (req, res = response) => {
    const id = req.params.id;
    const uid = req.uid;
    try {
        const medicoDB = await Medico.findById(id);
        if (!medicoDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Medico no encontrado'
            })
        }

        const cambiosMedico = {
            ...req.body,
            usuario: uid
        }
        const medicoActualizado = await Medico.findByIdAndUpdate(id, cambiosMedico, { new: true });

        res.json({
            ok: true,
            medico: medicoActualizado
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
}
const borrarMedico = async (req, res = response) => {
    const id = req.params.id;

    try {
        const medicoDB = await Medico.findById(id);
        if (!medicoDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Medico no encontrado'
            })
        }

        await Medico.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Medico eliminado',
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
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico,
    getMedicoById,
}