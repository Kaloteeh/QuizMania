import express from 'express';
import {Signup,Login, Users,deleteUser} from './controller/authController.js';

export const routes = () => {

    const router = express.Router();

    router.post('/api/signup', Signup);
    router.post('/api/login',Login )
    router.get('/api/users',Users )
    router.delete('/api/users/:id', deleteUser);
        
    return router;

}