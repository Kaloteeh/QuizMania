import {pool} from '../db.js';

export const Signup = async (req,res) => {
    
        const body = req.body;

        if(body.password !== body.confirm_password) {
                    return res.status(400).json({message: 'Passwords do not match'});
                }
                       
   
                try{
                        const connection = await pool.connect();

                        // Insert user data into the database
                        const result = await connection.query(
                                'INSERT INTO users (fullname, email, password,joined) VALUES ($1, $2,$3,$4) RETURNING *',
                                [body.fullname,body.email, body.password,body.joined]
                                );

                        // Release the database connection
                        connection.release();

                        // Check if the insertion was successful
                        if (result.rowCount === 1) {
                        res.status(201).json({ message: 'Sign up successful' });
                        } else {
                        res.status(500).json({ message: 'Failed to insert user data' });
                        }
                }catch(e){
                        console.log(e);
                        res.status(500).json({ message: 'An error occurred during user registration' });
                }
}
