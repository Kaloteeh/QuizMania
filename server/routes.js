import express from 'express';
import {Signup,Login,Logout, AuthenticatedUser} from './controller/authController.js';
import {Users,deleteUser,makeAdmin,getAdmins,demoteAdmin} from './controller/actionController.js';

export const routes = () => {

    const router = express.Router();

    router.post('/api/signup', Signup);
    router.post('/api/login',Login )
    router.get('/api/users',Users )
    router.get('/api/user',AuthenticatedUser)
    router.delete('/api/users/:id', deleteUser);
    //:id is a dynamic parameter that will be extracted from the URL instead of just having a static route like /users/id 
    router.post('/api/makeadmin/:id', makeAdmin);
    router.get('/api/admins',getAdmins)
    router.post('/api/logout', Logout);
    router.post('/api/demote/:id', demoteAdmin);
    return router;

}