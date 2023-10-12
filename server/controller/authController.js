import {pool} from '../db.js';
import bcryptjs from 'bcryptjs';
import { format } from 'date-fns';
import pkg from 'jsonwebtoken';


const {sign} = pkg;
const { verify } = pkg;

// Function to validate an email using a regular expression
function isValidEmail(email) {
        // Regular expression pattern for a basic email format validation
        const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
        return emailRegex.test(email);
      }

export const Signup = async (req,res) => {
    
        const body = req.body;
        let userGroup = "1";
        

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

              const accessToken = sign({ id: user.rows[0].id }, process.env.ACCESS_SECRET || '', { expiresIn: '1m' });

              const refreshToken = sign({ id: user.rows[0].id }, process.env.REFRESH_SECRET || '', { expiresIn: '1w' });
              
              const userid = user.rows[0].id;
              
              res.cookie('access_token', accessToken, { httpOnly: true,
              maxAge: 1000 * 60 * 60 * 24 ,
              sameSite: 'Strict' });//1 day

              res.cookie('refresh_token', refreshToken, { httpOnly: true,
                maxAge: 1000 * 60 * 60 * 24 * 7  });//7 days



              res.send({message : "Login successful",accessToken,refreshToken,userid});
        }catch(e){
           console.log(e);
           res.status(500).json({ message: 'An error occurred during login' });
        }

}

export const Logout = async (req,res) => {

        try{
                res.clearCookie('access_token');
                res.clearCookie('refresh_token');
                res.send({message : "Logout successful"});
        }catch(e){
                console.log(e);
                res.status(500).json({ message: 'An error occurred during logout' });
        }
}

export const AuthenticatedUser = async (req,res) => {
        
        try{
        const cookie = req.cookies["access_token"];
        // const cookie = req.cookies("access_token");

        console.log(cookie)
        if (!cookie) {
                return res.status(401).send({
                    message : "Token must be provided"
                });
            }
       try{
    const payload = verify(cookie, process.env.ACCESS_SECRET || "");

    if(!payload){
        return res.status(401).send({
                message : "Unauthenticated"
            })
       }        
      
                const user = await pool.query('SELECT * FROM users WHERE id = $1', [payload.id]);
                if (!user) {
                        return res.status(401).send({ message: "User not found" });
                    }
                res.send(user.rows[0].fullname);
                }catch(verificationError){
                        console.log("Token Verification Error :" , verificationError);
                        res.status(401).send({ message: "Invalid token or unauthorized" });
                }
        }catch(e){
                console.log(e);
                res.status(500).json({ message: 'An error occurred during authentication' });
        }
}