import {Router} from 'express';
import UserController from '../controllers/users.controller';
import VolcanoesController from "../controllers/volcanoes.controller";
import WaterfallsController from "../controllers/waterfalls.controller";
import auth from "../config/auth";
import AuthController from "../controllers/auth.controller";
import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './client/public/assets/uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + file.originalname);
    }
});

const upload = multer({
    storage: storage
});

const routes = Router();

//Auth
routes.post('/api/authenticate/register', AuthController.register);
routes.post('/api/authenticate/login', AuthController.authenticate);
routes.get('/api/authenticate/user', auth, AuthController.retrieve);

//Users routes
routes.get('/api/users', UserController.list);
routes.get('/api/users/:id', UserController.details);
routes.put('/api/users/:id', auth, UserController.update);
routes.delete('/api/users/:id', auth, UserController.delete);

//Volcanoes routes
routes.get('/api/volcanoes', VolcanoesController.list);
routes.post('/api/volcanoes', auth, upload.single('image'), VolcanoesController.create);
routes.get('/api/volcanoes/:id', auth, VolcanoesController.details);
routes.put('/api/volcanoes/:id', auth, upload.single('image'), VolcanoesController.update);
routes.delete('/api/volcanoes/:id', auth, VolcanoesController.delete);


//Waterfalls routes
routes.get('/api/waterfalls', WaterfallsController.list);
routes.post('/api/waterfalls', auth, upload.single('image'), WaterfallsController.create);
routes.get('/api/waterfalls/:id', auth, WaterfallsController.details);
routes.put('/api/waterfalls/:id', auth, upload.single('image'), WaterfallsController.update);
routes.delete('/api/waterfalls/:id', auth, WaterfallsController.delete);

export default routes;
