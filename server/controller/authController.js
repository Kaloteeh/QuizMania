import {pool} from '../db.js';
import bcryptjs from 'bcryptjs';
import { format } from 'date-fns';

// Function to validate an email using a regular expression
function isValidEmail(email) {
        // Regular expression pattern for a basic email format validation
        const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
        return emailRegex.test(email);
      }

export const Signup = async (req,res) => {
    
        const body = req.body;
        let userGroup = "2";
        

                 if(body.password !== body.password_confirm) {
                    return res.status(400).json({message: 'Passwords do not match . Please try again'});
                }
                if(body.email === ""){
                        return res.status(400).json({message: 'Email cannot be empty'});
                }
                if (!isValidEmail(body.email)) {
                        return res.status(400).json({ message: 'Invalid email format' });
                      }
                if(body.password === ""){
                        return res.status(400).json({message: 'Password cannot be empty'});
                }
                if(body.fullname === ""){
                        return res.status(400).json({message: 'Fullname cannot be empty'});
                }

        
   
                try{

                        
                        const currentDate = new Date();
                        const dateFormat = 'yyyy-MM-dd HH:mm:ss';
                        const joined = format(currentDate, dateFormat);

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
                                  joined,
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
