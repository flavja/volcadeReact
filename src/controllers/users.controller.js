'use strict';

import User from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


class UserController {

    /**
     * List users
     * @param {Request} req
     * @param {Response} res
     */
    static async list(req, res) {
        let status = 200;
        let body = {};

        try {
            let users = await User.find().select(['-__v', '-password']);
            body = {users, 'message': 'Users\' list'};
        } catch (error) {
            status = 500;
            body = {'message': error.message};
        }
        return res.status(status).json(body);
    }

    /**
     * Details user
     * @param {Request} req
     * @param {Response} res
     */
    static async details(req, res) {
        let status = 200;
        let body = {};

        try {
            let user = await User.findById(req.params.id).select(['-__v', '-password']);
            body = {user, 'message': 'User details'};
        } catch (error) {
            status = 500;
            body = {'message': error.message};
        }
        return res.status(status).json(body);
    }

    static async delete(req, res) {
        try {
            await User.remove({_id: req.params.id});
            res.status(status).json({'message': 'user deleted'});
        } catch (error) {
            res.status(500).json({'message': error.message});
        }
    }

    static async update(req, res) {
        try {
            let user = await User.findByIdAndUpdate(req.params.id, {$set: req.body});
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({'message': error.message});
        }
    }

}

export default UserController;
