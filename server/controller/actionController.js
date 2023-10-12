import {pool} from '../db.js';

export const Users = async (req,res) => {

    try{
            const users = await pool.query('SELECT * FROM users WHERE usergroup = 2');
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

export const makeAdmin = async (req,res) => {
    try{
            const id = req.params.id;
            const user = await pool.query('UPDATE users SET usergroup = $1 WHERE id = $2', ['1', id]);
            //this works like this : a normal user is 2 and an admin is 1
            //so we are updating the usergroup of the user with id 2 to 1
            res.send({message : "User is now an admin"});
    }catch(e){
            console.log(e);
            res.status(500).json({ message: 'An error occurred while making user an admin' });
    }
}

export const getAdmins = async (req,res) => {
        
            try{
                  const users = await pool.query('SELECT * FROM users WHERE usergroup = 1');
                  res.json(users.rows);
            }catch(e){
                  console.log(e);
                  res.status(500).json({ message: 'An error occurred while fetching users' });
            }
}

export const demoteAdmin = async (req,res) => {
        try {
                const id = req.params.id;
                const user = await pool.query('UPDATE users SET usergroup = $1 WHERE id = $2', ['2', id]);
                res.send({message : "User is now a normal user"});
        }catch(e){
                console.log(e);
                res.status(500).json({ message: 'An error occurred while demoting user' });
        }
}
