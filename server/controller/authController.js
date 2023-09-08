import {pool} from '../db.js';
import bcryptjs from 'bcryptjs';

export const Signup = async (req,res) => {
    
        const body = req.body;
        let userGroup = "1";

                 if(body.password !== body.confirm_password) {
                    return res.status(400).json({message: 'Passwords do not match'});
                }
                //how do I check if the email already exists in the database?
                if(body.email === ""){
                        return res.status(400).json({message: 'Email cannot be empty'});
                }
                if(body.password === ""){
                        return res.status(400).json({message: 'Password cannot be empty'});
                }
                if(body.fullname === ""){
                        return res.status(400).json({message: 'Fullname cannot be empty'});
                }

        
   
                try{
                        const connection = await pool.connect();


                        // Check if the email already exists in the database
                        const emailExistsQuery = await connection.query(
                                'SELECT * FROM users WHERE email = $1',
                                [body.email]
                        );
                                
                        if (emailExistsQuery.rowCount > 0) {
                                // Email already exists, return an error response
                                connection.release();
                                return res.status(400).json({ message: 'Email already in use' });
                        }

                        const passwordHash =await bcryptjs.hash(body.password, 12)
                        // Insert user data into the database
                        const result = await connection.query(
                                'INSERT INTO users (fullname, email, password, joined, usergroup) VALUES ($1,$2,$3,$4,$5) RETURNING *',
                                [
                                  body.fullname,
                                  body.email,
                                  passwordHash,
                                  body.joined,
                                  userGroup
                                ]
                                );
                                //this will usually return the number of rows affected by the query

                        // Release the database connection
                        connection.release();

                        //And here we are checking if the rows affected is equal to 1 since we are inserting one user
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
