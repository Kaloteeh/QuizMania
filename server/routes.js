import express from 'express';
import {Signup} from './controller/authController.js';

export const routes = () => {

    const router = express.Router();

    router.post('/api/signup', Signup);

        
    return router;

}