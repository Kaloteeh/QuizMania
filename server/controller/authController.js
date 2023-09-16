import {pool} from '../db.js';
import bcryptjs from 'bcryptjs';
import { format } from 'date-fns';
import pkg from 'jsonwebtoken';

const {sign} = pkg;

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

export const Login = async (req,res) => {

        try{
        const user = await pool.query('SELECT * FROM users WHERE email = $1', [req.body.email]);
        if (user.rowCount === 0) {
                return res.status(400).json({ message: 'Invalid email or password' });
              }
        const validPassword = await bcryptjs.compare(req.body.password, user.rows[0].password);
        if (!validPassword) {
                return res.status(400).json({ message: 'Invalid email or password' });
              }

              const accessSecret = sign({ id: user.rows[0].id }, "access_secret", { expiresIn: '1m' });

              const refreshToken = sign({ id: user.rows[0].id }, "refresh_token", { expiresIn: '1w' });
        
              
              res.cookie('access_secret', accessSecret, { httpOnly: true,
              maxAge: 1000 * 60 * 60 * 24  });//1 day

              res.cookie('refresh_token', refreshToken, { httpOnly: true,
                maxAge: 1000 * 60 * 60 * 24 * 7  });//7 day

                //q : do the access secret and refresh token mean that when I refresh the page, I will still be logged in?
                //ans : yes, the access token is valid for 1 day and the refresh token is valid for 7 days
                //q : what is the purpose of the refresh token?
                //ans : the refresh token is used to generate a new access token when the access token expires
                //q : what is the purpose of the access token?
                //ans : the access token is used to authenticate the user when they make a request to the server
                //q : what is the purpose of the httpOnly?
                //ans : the httpOnly is used to prevent the access token and refresh token from being accessed by javascript
                //q : what is the purpose of the maxAge?
                //ans : the maxAge is used to set the expiry time of the access token and refresh token
                // q : so when I refresh the page I refresh the access token ?
                //ans : yes, the access token is refreshed when the page is refreshed


              res.send({message : "Login successful"});
        }catch(e){
           console.log(e);
           res.status(500).json({ message: 'An error occurred during login' });
        }

}

export const Users = async (req,res) => {

        try{
                const users = await pool.query('SELECT * FROM users');
                res.json(users.rows);
        }catch(e){
                console.log(e);
                res.status(500).json({ message: 'An error occurred while fetching users' });
        }

}

export const deleteUser = async (req,res) => { 
                try{
                        const id = req.params.id;
                        const user = await pool.query('DELETE FROM users WHERE id = $1', [id]);
                        res.send({message : "User deleted successfully"});
                }catch(e){
                        console.log(e);
                        res.status(500).json({ message: 'An error occurred while deleting user' });
                }
        
        }