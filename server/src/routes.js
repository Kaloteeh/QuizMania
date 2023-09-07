
export const routes = () => {

    const express = require('express');
    const router = express.Router();

    const userController = require('./controllers/userController');
    const authController = require('./controllers/authController');

    
    router.post('/users', userController.create);
   


    router.get('/users', userController.index);
    router.get('/users/:id', userController.show);
    router.put('/users/:id', userController.update);
    router.delete('/users/:id', userController.destroy);

    // Auth
    router.post('/auth', authController.authenticate);

    return router;

   

}