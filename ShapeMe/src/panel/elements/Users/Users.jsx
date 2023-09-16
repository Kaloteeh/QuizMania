import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Users.css'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { set } from 'date-fns';

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

  const [buttonDisabled,setButtonDisabled] = useState(true);

  const handleDisabledButton = () => {
    if(buttonDisabled){
      setButtonDisabled(false)
      return
  }
  setButtonDisabled(true)
  }

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



  return (

    <div>
      <table className='table'>
        <thead className='tableHead'>
          <tr className='tableIndex'>
          <th className='th'><Button onClick={handleDisabledButton}>Edit Users</Button></th>
          <th className='th'>ID</th>
          <th className='th'>FullName</th>
          <th className='th'>Email</th>
          <th className='th'>Joined</th>
          </tr>
        </thead>
        <tbody className='tbody'>
          {records.map((user, id) => (
            <tr key={id} className="user-item">
              <td className='td'> 
              {buttonDisabled? <Button disabled 
              variant='contained'
              >
                Edit</Button>
              : 
              <Button 
              variant='contained'
               sx={{background:'rgb(128,128,250,1)',
               ":hover":{background:'rgb(95, 95, 240, 1)'}
               }}
               onClick={() => handleOpenDialog(user.id,user.fullname)}>
                Edit
                </Button>
                }
              
              </td>
              <td className='td'>{user.id}</td>
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
          Are you sure you want to delete user :<br/>
          <b>ID</b> - {selectedUserIdToDelete}<br/>
          <b>Fullname </b> - {userName}
          </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancelDelete} color='primary'>
              Cancel
            </Button>
            <Button onClick={handleConfirmDelete} color='primary' autoFocus>
              Confirm
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
