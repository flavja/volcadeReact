'use strict';

import Waterfall from '../models/Waterfall';

class WaterfallsController {

    /**
     * Create waterfall
     * @param {Request} req
     * @param {Response} res
     */
    static async create(req, res) {
        try {
            const waterfall = await Waterfall.create(req.body);
            if (!waterfall) throw Error('Trouble during creation');
            res.status(200).json(waterfall);
        } catch (error) {
            res.status(400).json({message: error.message});
        }
    };

    /**
     * List waterfall
     * @param {Request} req
     * @param {Response} res
     */
    static async list(req, res) {
        try {
            const waterfall = await Waterfall.find().select(['-__v']);
            if (!waterfall) throw Error('No Waterfalls');
            res.status(200).json(waterfall);
        } catch (error) {
            res.status(400).json({message: error.message});
        }
    };

    /**
     * Details waterfall
     * @param {Request} req
     * @param {Response} res
     */
    static async details(req, res) {
        try {
            const waterfall = await Waterfall.findById(req.params.id).select(['-__v']);
            res.status(200).json(waterfall);
        } catch (error) {
            res.status(400).json({'message': error.message});
        }
    };

    static async delete(req, res) {
        try {
            const waterfall = Waterfall.findById(req.params.id);
            if (!waterfall) throw Error('Waterfall not found');

            const removed = await waterfall.remove();
            if (!removed) throw Error('Could not delete the waterfall');
            res.status(200).json({success: true});
        } catch (error) {
            res.status(400).json({message: error.message, success: false});
        }
    };

    static async update(req, res) {
        try {
            const waterfall = await Waterfall.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
            res.status(200).json(waterfall);
        } catch (error) {
            res.status(400).json({'message': error.message});
        }
    };

}

export default WaterfallsController;
