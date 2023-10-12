import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Users.css'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import EditIcon from '@mui/icons-material/Edit';
import Fab from '@mui/material/Fab';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'; 
import AddIcon from '@mui/icons-material/Add';



export default function Users() {


  const [users, setUsers] = useState([]); // Initialize state to store fetched data


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/users');
        setUsers(response.data); // Update the state with the fetched data
      } catch (err) {
        console.error(err);
      }
    };

    fetchData(); // Call the fetchData function when the component mounts
  }, []); // The empty dependency array ensures that this effect runs once when the component mounts


  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(10);
  const lastIndex = currentPage * usersPerPage;
  const firstIndex = lastIndex - usersPerPage;
  const records = users.slice(firstIndex, lastIndex);
  const npage= Math.ceil(users.length / usersPerPage);
  const pageNumbers = [...Array(npage+1).keys()].slice(1);

  //Q : what is math.ceil?
  //A : The Math.ceil() function always rounds a number up to the next largest integer.


const [isDialogOpen, setIsDialogOpen] = useState(false);
const [selectedUserIdToDelete, setSelectedUserIdToDelete] = useState(null);
const [userName,setUserName] = useState(null);


const handleOpenDialog = (userId,userName) => {
  setUserName(userName);
  setSelectedUserIdToDelete(userId);
  setIsDialogOpen(true);
};

const handleConfirmDelete = async () => {
  await axios.delete(`http://localhost:3001/api/users/${selectedUserIdToDelete}`);
  setIsDialogOpen(false);
  window.location.reload();
};

const handleCancelDelete = () => {
  setSelectedUserIdToDelete(null); // Clear the selected user ID
  setIsDialogOpen(false);
};


const [selectedRows, setSelectedRows] = useState([]);

const handleSelectedRow = (id) => {
  if (selectedRows.includes(id)) {
    // Deselect the row by removing its ID from the selectedRows array
    setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
  } else {
    // Select the row by adding its ID to the selectedRows array
    setSelectedRows([...selectedRows, id]);
    
  }
};

const [selectedUserNameToPomote,setSelectedUserNameToPromote] = useState(null);
const [selectedUserIdToPromote,setSelectedUserIdToPromote] = useState(null);
const [isAdminDialogOpen,setAmdinDialogOpen] = useState(false);

const handleAdminOpenDialog = (userId,userName) => {
  setSelectedUserIdToPromote(userId);
  setSelectedUserNameToPromote(userName);
  setAmdinDialogOpen(true);
}

const handlePromoteAdmin = async () => {
  console.log(selectedUserIdToPromote);
  await axios.post(`http://localhost:3001/api/makeadmin/${selectedUserIdToPromote}`);
  setAmdinDialogOpen(false);
  window.location.reload();
}

const handleCancelAdmin = () => {
  setAmdinDialogOpen(false);
}


  return (

    <div>
      <table className='table'>
        <thead className='tableHead'>
          <tr className='tableIndex'>
          <th className='th'><Button>Edit Users</Button></th>
          <th className='th'>ID</th>
          <th className='th'>FullName</th>
          <th className='th'>Email</th>
          <th className='th'>Joined</th>
          </tr>
        </thead>
        <tbody className='tbody'>
          {records.map((user, id) => (
            <tr key={id} id={`${selectedRows.includes(user.id) ? 'selected-row' : ''}`} className={`user-item  ${(id % 2==0) ? 'gray' : '' } `}>
              <td className='td first-column'> 

{/* DELETE BUTTONS */}
              {selectedRows.includes(user.id) ? (
              <Button
                variant="contained"
                sx={{
                  marginLeft: '1rem',
                  background: 'rgb(255,5,5,1)',
                  width: '35px',
                  ':hover': { background: 'rgb(220, 24, 24, 1)' },
                }}
                onClick={() => handleOpenDialog(user.id, user.fullname)}
              >
                <DeleteForeverIcon />
              </Button>
            ) : (
              <Button 
              sx={
                {
                  marginLeft: '1rem'
                }
              }disabled variant="contained">
                <DeleteForeverIcon />
              </Button>
            )}
{/* ADD BUTTONS FOR ADMIN */}
          {!selectedRows.includes(user.id) ? (
              <Fab size="small" 
              disabled
               sx={{background:'rgb(51,240,133,1)',
               ':hover':{background : 'rgb(26,195,99,1)'},
               marginLeft:'1rem'}} 
               aria-label="add">
                <AddIcon />
              </Fab>
          ) : (<Fab size="small" 
           sx={{background:'rgb(51,240,133,1)',
           ':hover':{background : 'rgb(26,195,99,1)'},
           marginLeft:'1rem'}} 
           aria-label="add"
           onClick={()=>handleAdminOpenDialog(user.id,user.fullname)}>
            <AddIcon />
          </Fab>)}

{/* EDIT BUTTON */}
              <Fab color="primary" 
                   aria-label="edit"
                   
                  sx={{marginLeft:'20px',height:'35px',width:'35px',}}
                  onClick={()=>{handleSelectedRow(user.id)}}>
                  <EditIcon sx={{height:'20px'}} />
              </Fab>
{/* EDIT BUTTON */}        
              </td>
              <td className='td' >{user.id}</td>
              <td className='td'>{user.fullname}</td>
              <td className='td'>{user.email}</td>
              <td className='td'>{user.joined}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Dialog
              open={isDialogOpen}
              onClose={handleCancelDelete}
              aria-labelledby='alert-dialog-title'
              aria-describedby='alert-dialog-description'
            >
              <DialogTitle id='alert-dialog-title'>Confirm Deletion</DialogTitle>
              <DialogContent>
                <DialogContentText id='alert-dialog-description'>
              Are you sure you want to DELETE user :<br/>
              <b>ID</b> - {selectedUserIdToDelete}<br/>
              <b>Fullname </b> - {userName}
              </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCancelDelete} sx={{background:'rgb(75,118,218)',color:'white',":hover":{background : 'rgb(123,150,213,1)'}}}>
                  Cancel
                </Button>
                <Button onClick={handleConfirmDelete} sx={{background:'red',color:'white',":hover":{background : 'rgb(240,114,114,1)'}}} autoFocus>
                  DELETE
              </Button>
            </DialogActions>
      </Dialog>

      {/* THIS IS THE ADMIN DIALOG WHICH OPENS WHEN WE CLICK THE + BUTTON */}
      <Dialog
          open={isAdminDialogOpen}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
          >
            <DialogTitle id='alert-dialog-title'>Confirm Action</DialogTitle>
            <DialogContent>
                <DialogContentText id='alert-dialog-description'>
              Are you sure you want promote user to ADMIN :<br/>
              <b>ID</b> - {selectedUserIdToPromote}<br/>
              <b>Fullname </b> - {selectedUserNameToPomote}
              </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCancelAdmin} sx={{background:'rgb(75,118,218)',color:'white',":hover":{background : 'rgb(123,150,213,1)'}}}>
                  Cancel
                </Button>
                <Button onClick={handlePromoteAdmin} sx={{background:'rgb(98,198,72)',color:'white',":hover":{background : 'rgb(137,205,121,1)'}}} autoFocus>
                  Promote
              </Button>
            </DialogActions>
      </Dialog>
      <nav>
      <ul className='pagination'>
  <li className='page-item'>
    <a className='page-link' href='#' onClick={prePage}>Previous</a>
  </li>
  {pageNumbers.map((number, i) => (
    <li className={`page-item ${currentPage === number ? 'active' : ''}`} key={i}>
      <a
        className='page-link'
        href='#'
        onClick={() => {

          changePage(number);
        }}
      >
        {number}
      </a>
    </li>
  ))}
  <li className='page-item'>
    <a className='page-link' href='#' onClick={nextPage}>Next</a>
  </li>
</ul>
      </nav>
    </div>


  );

  function prePage() {
        if(currentPage !== 1){
           setCurrentPage(currentPage - 1);

        }
  }

  function changePage(id) {
      setCurrentPage(id);
  }

  function nextPage() {
      if(currentPage !== npage){ ;
        setCurrentPage(currentPage + 1);
      }
  }
  

}
