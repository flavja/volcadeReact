'use strict';

import Volcano from '../models/Volcano';

class VolcanoesController {

    /**
     * Create volcano
     * @param {Request} req
     * @param {Response} res
     */
    static async create(req, res) {
        try {
            const volcano = await Volcano.create({
                title: req.body.title,
                desc: req.body.desc,
                type: req.body.type,
                country: req.body.country,
                latitude: req.body.latitude,
                longitude: req.body.longitude,
                height: req.body.height,
                added_by: req.body.added_by,
                image: req.file && req.file.filename
            });
            if (!volcano) throw Error('Trouble during creation');
            res.status(200).json(volcano);
        } catch (error) {
            res.status(400).json({message: error.message});
        }
    };

    /**
     * List volcanoes
     * @param {Request} req
     * @param {Response} res
     */
    static async list(req, res) {
        try {
            const volcanoes = await Volcano.find().select(['-__v']);
            if (!volcanoes) throw Error('No Volcanoes');
            res.status(200).json(volcanoes);
        } catch (error) {
            res.status(400).json({message: error.message});
        }
    };

    /**
     * Details volcano
     * @param {Request} req
     * @param {Response} res
     */
    static async details(req, res) {
        try {
            const volcano = await Volcano.findById(req.params.id).select(['-__v']);
            res.status(200).json(volcano);
        } catch (error) {
            res.status(400).json({'message': error.message});
        }
    };

    static async delete(req, res) {
        try {
            const volcano = Volcano.findById(req.params.id);
            if (!volcano) throw Error('Volcano not found');

            const removed = await volcano.remove();
            if (!removed) throw Error('Could not delete the volcano');
            res.status(200).json({success: true});
        } catch (error) {
            res.status(400).json({message: error.message, success: false});
        }
    };

    static async update(req, res) {
        if(req.file) {
            req.body.image = req.file.filename
        };
        try {
            const volcano = await Volcano.findByIdAndUpdate(req.params._id, {$set: req.body}, {new: true});
            res.status(200).json(volcano);
        } catch (error) {
            res.status(400).json({'message': error.message});
        }
    };

}

export default VolcanoesController;
